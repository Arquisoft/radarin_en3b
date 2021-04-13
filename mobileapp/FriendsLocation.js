import * as SecureStore from "expo-secure-store";
import forge from 'node-forge';
import { getLocation } from "./ProfileScreen";
import { getPreciseDistance } from "geolib";

const apiEndPoint = 'https://radarinen3brestapi.herokuapp.com/api';
const MAX_DISTANCE = 2000000; //Testing value, should be something like 2000m
const MAX_TIME = 30000000000; //Testing value, should be something like 3600.000ms

async function buildJwt() {
    const p = await SecureStore.getItemAsync("op234iyu5v6oy234iuv6");
    const parsed = JSON.parse(p);
    const userId = parsed.webId;
    const key = forge.pki.privateKeyFromPem(parsed.privateKey);
    const md = forge.md.sha256.create();
    const header = {
        alg: "RS256",
        typ: "JWT"
    };
    const payload = {
        sub: "test",
        webid: userId,
    };
    const header64 = forge.util.encode64(JSON.stringify(header)).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    const payload64 = forge.util.encode64(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    const preHash = header64 + '.' + payload64;
    md.update(preHash, 'utf8');
    const signature = key.sign(md);
    const strSignature = forge.util.encode64(signature).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    return header64 + '.' + payload64 + '.' + strSignature;
}

export async function getFriendsLocation(friends) {
    let locations = {};
    const auth = await buildJwt();

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

    if (myLocation == null){
        return "No location";
    }

    let parsedLocations = {};
    for (let l of Object.entries(locations))
        if (Date.now() - l[1].timestamp < MAX_TIME)
            parsedLocations[l[0]]= l[1];

    return new Map(Object.keys(parsedLocations).map(key => [key, calculateDistance(parsedLocations[key], myLocation)]).filter(([k, v]) => v <= MAX_DISTANCE));
}

function calculateDistance(friendLoc, myLoc){
    let pdis = getPreciseDistance(
        { latitude: friendLoc.coords.latitude, longitude: friendLoc.coords.longitude },
        { latitude: myLoc.coordinates[0], longitude: myLoc.coordinates[1] }
    );
    return pdis;
}
