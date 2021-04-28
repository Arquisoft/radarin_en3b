import * as SecureStore from "expo-secure-store";
import { getLocation } from "./GetAsyncLocation";
import { getPreciseDistance } from "geolib";
import BuildToken from "./utils/BuildToken";

const apiEndPoint = 'https://radarinen3brestapi.herokuapp.com/api';
const MAX_DISTANCE = 15000; //Testing value, should be something like 2000m
const MAX_TIME = 30000000000; //Testing value, should be something like 3600.000ms

export async function getFriendsLocation(friends) {
    let locations = {};
    const auth = await BuildToken();

    const p = await SecureStore.getItemAsync("op234iyu5v6oy234iuv6");
    const parsed = JSON.parse(p);
    const userId = parsed.webId;

    const url = friends.reduce((url, f) => url += (encodeURIComponent(f.webId) + ','),
        apiEndPoint + '/friendslocations?webId=' + encodeURIComponent(userId) + '&friendIds=');

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + auth }
        });
        locations = await response.json();
    } catch (error) {
        console.log("Error loading locations :" + error);
        throw error;

    }
    return locations;
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
    const parsedLocations = Object.entries(locations).filter(location => date < location[1].timestamp < MAX_TIME);

    return new Map(parsedLocations.map(location => [location[0], 
        { value: calculateDistance(location[1], myLocation), mapsUrl: getMapsUrl(location[1]) }]).filter(([k, v]) => v.value <= MAX_DISTANCE));
}
