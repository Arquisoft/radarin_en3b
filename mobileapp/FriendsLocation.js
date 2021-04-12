import * as SecureStore from "expo-secure-store";
import forge from 'node-forge';
import { getLocation } from "./ProfileScreen";
import { getPreciseDistance } from "geolib";
import BuildToken from "./utils/BuildToken"

const apiEndPoint = 'https://radarinen3brestapi.herokuapp.com/api';

async function getFriendsLocation(friends) {
    let locations = {};
    const auth = await BuildToken();

    const p = await SecureStore.getItemAsync("op234iyu5v6oy234iuv6");
    const parsed = JSON.parse(p);
    const userId = parsed.webId;

    let url = apiEndPoint + '/friendslocations?webId=' + encodeURIComponent(userId) + '&friendIds=';
    for (let f of friends) {
        url += (encodeURIComponent(f.value) + ',');
    }
    await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + auth }
    }).then((resp) => resp.json()).then(function (data) {
        locations = data;
    })
        .catch(function (error) {
            console.log("Error loading locations :" + error);
        });

    return locations;
}

export async function getDistances(friends) {
    const locations = await getFriendsLocation(friends);
    const myLocation = getLocation();
    return new Map(Object.keys(locations).map(key => [key, calculateDistance(locations[key], myLocation)]));
}

function calculateDistance(friendLoc, myLoc){
    let pdis = getPreciseDistance(
        { latitude: friendLoc.coords.latitude, longitude: friendLoc.coords.longitude },
        { latitude: myLoc.coordinates[0], longitude: myLoc.coordinates[1] }
    );
    return pdis;
}
