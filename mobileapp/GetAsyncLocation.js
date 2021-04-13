import * as Location from 'expo-location';
import {sendLocation} from './SendLocation';
import * as TaskManager from 'expo-task-manager';

const fiveMin = 5000; //300000
const minDistance = 500;

const optionsAndroid = {
    accuracy: Location.LocationAccuracy.High,
    timeInterval: fiveMin,
    distanceInterval: minDistance,
    foregroundService: {
        notificationTitle: "Radarin update",
        notificationBody: "Radarin is taking your location..."
    }
}

export async function getLocationAsync(turnedOn) {
    let status = await Location.requestPermissionsAsync();
    let errorMsg;

    if (status.status !== "granted") {
        errorMsg = "Permission to access location was denied";
        return;
    }
    if (turnedOn) {
        Location.startLocationUpdatesAsync("backgroundLocations", optionsAndroid);
        TaskManager.defineTask("backgroundLocations", ({ data: { locations }, error }) => {
            if (error) {
                return;
            }
            console.log('Received new locations', locations[locations.length - 1]);
        });
    } else {
        Location.stopLocationUpdatesAsync("backgroundLocations");
    }

    return;
}

export async function getLocation() {
    let location = await Location.getCurrentPositionAsync();
    console.log(location);
    //sendLocation(location.coords, location.timestamp);
    //alert("location has been sent");
    console.log("han pasado 5 segundos en background");
    return;
}