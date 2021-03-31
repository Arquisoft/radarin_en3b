import * as SecureStore from "expo-secure-store";
import forge from 'node-forge';
import {getLocation} from "./ProfileScreen";
import { getPreciseDistance } from "geolib";

//For testing purposes, must be changed later

const apiEndPoint = 'http://192.168.50.55:5000';
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
        webid: userId
    };
    const header64 = forge.util.encode64(JSON.stringify(header)).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    const payload64 = forge.util.encode64(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    const preHash = header64 + '.' + payload64;
    md.update(preHash, 'utf8');
    const signature = key.sign(md);
    const strSignature = forge.util.encode64(signature).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    return header64 + '.' + payload64 + '.' + strSignature;
}

async function getFriendLocation(friend){
    let location;
    const auth = await buildJwt();
    let webId = friend.value;
    //var webId = 'https://carmen279.inrupt.net/profile/card#me';
    let url = apiEndPoint + '/locations?webId='+ encodeURIComponent(webId);
    //console.log(url);
    //await fetch(url, {
    //    method: 'GET',
    //    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + auth }
    //}).then((resp) => console.log(resp.json())).then(function(data) {
    //    location = data.results;
    //})
    //.catch(function(error) {
    //console.log("Error loading location"+error);
    //});

    //Temporal until get works
   location = { id: 1, coordinates: [43.3638658051, -5.84934495326], name: "Oviedo", details: "Location #1" }

    return location;
}

export async function getDistance(friend){
    let location = await getFriendLocation(friend);
    let myLocation = getLocation();

    return calculateDistance(location, myLocation);
}

function calculateDistance(friendLoc, myLoc){
    let pdis = getPreciseDistance(
        { latitude: friendLoc.coordinates[0], longitude: friendLoc.coordinates[1] },
        { latitude: myLoc.coordinates[0], longitude: myLoc.coordinates[1] }
      );

    return pdis;
} 
