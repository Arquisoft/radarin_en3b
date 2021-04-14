import * as SecureStore from "expo-secure-store";
import forge from "node-forge";
import TokenBuilder from "./utils/BuildToken";

//For testing purposes, must be changed later

const apiEndPoint = 'https://radarinen3brestapi.herokuapp.com/api';

//In the future this will be changed and the userID will be passed
export async function sendLocation(coords, timestamp) {
    const auth = await TokenBuilder();
    const p = await SecureStore.getItemAsync("op234iyu5v6oy234iuv6");
    const parsed = JSON.parse(p);
    const userId = parsed.webId;
    try {
        await fetch(apiEndPoint + "/locations", {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + auth },
            body: JSON.stringify({
                "webId": userId,
                "coords": coords,
                "timestamp": timestamp
            })
        });
    }
    catch (error) {
        console.log("Error loading locations :" + error);
    };
    console.log("Position sent");
}