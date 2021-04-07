import * as SecureStore from "expo-secure-store";
import forge from 'node-forge';
import {getLocation} from "./ProfileScreen";
import { getPreciseDistance } from "geolib";

//Ip of my computer's wifi adapter
const apiEndPoint = 'https://radarinen3brestapi.herokuapp.com/api'
let distances = {};

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

async function getFriendsLocation(friends){
    let locations = {};
    const auth = await buildJwt();

    const p = await SecureStore.getItemAsync("op234iyu5v6oy234iuv6");
    const parsed = JSON.parse(p);
    const userId = parsed.webId;
    
    let url = apiEndPoint + '/friendslocations?webId='+ encodeURIComponent(userId)+'&friendIds=';
    for (let f of friends){
        url += (encodeURIComponent(f.value) +',');
    }
    console.log(url);
    await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + auth }
    }).then((resp) => resp.json()).then(function(data) {
        locations = data;
    })
    .catch(function(error) {
        console.log("Error loading locations :"+error);
        });

    return locations;
}

export async function getDistances(friends){
    let locations = await getFriendsLocation(friends);
    let myLocation = getLocation();
    let distances = {};

    for (let key in locations){
        let location = locations[key];
        distances[key] = calculateDistance(location, myLocation);
    }

    return distances;
}

function calculateDistance(friendLoc, myLoc){
    console.log(friendLoc);
    let pdis = getPreciseDistance(
        { latitude: friendLoc.coords.latitude, longitude: friendLoc.coords.longitude },
        { latitude: myLoc.coordinates[0], longitude: myLoc.coordinates[1] }
      );
    return pdis;
} 
