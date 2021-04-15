import * as SecureStore from "expo-secure-store";
import { getLocation } from "./GetAsyncLocation";
import { getPreciseDistance } from "geolib";
import BuildToken from "./utils/BuildToken";

const apiEndPoint = 'https://radarinen3brestapi.herokuapp.com/api';
const MAX_DISTANCE = 2000; //Testing value, should be something like 2000m
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
        console.log(JSON.stringify(locations));
    } catch (error) {
        console.log("Error loading locations :" + error);
        throw error;

    }
    return locations;
}

export async function getDistances(friends) {
    const locations = await getFriendsLocation(friends);
    const myLocation = await getLocation(); // here will go getLocation

    if (myLocation == null) {
        return "No location";
    }

    let parsedLocations = {};
    for (let l of Object.entries(locations))
        if (Date.now() - l[1].timestamp < MAX_TIME)
            parsedLocations[l[0]] = l[1];

    return new Map(Object.keys(parsedLocations).map(key => [key, calculateDistance(parsedLocations[key], myLocation)])
        .filter(([k, v]) => v <= MAX_DISTANCE));
}

function calculateDistance(friendLoc, myLoc) {
    let pdis = getPreciseDistance(
        { latitude: friendLoc.coords.latitude, longitude: friendLoc.coords.longitude },
        { latitude: myLoc.coords.latitude, longitude: myLoc.coords.longitude }
    );
    return pdis;
}
