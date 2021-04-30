import { getLocation } from "./GetAsyncLocation";
import { getPreciseDistance } from "geolib";
import BuildToken from "./utils/BuildToken";

const apiEndPoint = 'https://radarinen3brestapi.herokuapp.com/api';
const MAX_DISTANCE = 20000; //Testing value, should be something like 2000m
const MAX_TIME = 30000000000; //Testing value, should be something like 3600.000ms

export async function getFriendsLocation(friends) {
    const auth = await BuildToken();
    try {
        const responses = await Promise.all(
            friends.map(f => fetch(`${apiEndPoint}/locations?webId=${encodeURIComponent(f.webId)}&last=true`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + auth }
            })));
        
        const locations = await Promise.all(responses.map(r => r.json()));
        
        return locations.map(location => [location.webId, location]);
    } catch (error) {
        console.log("Error loading locations :" + error);
        throw error;
    }
}

function calculateDistance(friendLoc, myLoc) {
    let pdis = getPreciseDistance(
        { latitude: friendLoc.coords.latitude, longitude: friendLoc.coords.longitude },
        { latitude: myLoc.coords.latitude, longitude: myLoc.coords.longitude }
    );
    return pdis;
}

function getMapsUrl(coordinates) {
    const lat = coordinates.coords.latitude;
    const long = coordinates.coords.longitude;
    return "https://www.google.com/maps/dir/?api=1&destination=".concat(lat).concat(",").concat(long).concat("&travelmode=walking");
}

export async function getDistances(friends) {
    const myLocation = await getLocation();

    if (myLocation == null) {
        return "No location";
    }

    const locations = await getFriendsLocation(friends);

    const date = Date.now();
    const parsedLocations = locations.filter(location => date < location[1].timestamp < MAX_TIME);

    return new Map(parsedLocations.map(location => [location[0],
    { value: calculateDistance(location[1], myLocation), mapsUrl: getMapsUrl(location[1]) }]).filter(([k, v]) => v.value <= MAX_DISTANCE));
}
