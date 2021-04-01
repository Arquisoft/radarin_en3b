import * as SecureStore from "expo-secure-store";
import forge from "node-forge";

//For testing purposes, must be changed later

const apiEndPoint = 'http://192.168.1.36:5000/api'

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

//In the future this will be changed and the userID will be passed
export async function sendLocation(coords, timestamp) {
    const auth = await buildJwt();
    const p = await SecureStore.getItemAsync("op234iyu5v6oy234iuv6");
    const parsed = JSON.parse(p);
    const userId = parsed.webId;
    await fetch(apiEndPoint + "/locations", {
        method: 'POST',
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + auth },
        body: JSON.stringify({
            "webId": userId,
            "coords": coords,
            "timestamp": timestamp
        })
    }).then((resp) => resp.json()).then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        console.log("Error loading locations :"+error);
        });
    console.log("Position sent");
}