import * as Location from "expo-location";
import {sendLocation} from "./SendLocation";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const fiveMin = 10000; //minumum interval of time to send the location -> 5 min
const minDistance = 0; //minimum interval of distance to send the location -> 500 m

const optionsAndroid = {
  accuracy: Location.LocationAccuracy.High,
  timeInterval: fiveMin,
  distanceInterval: minDistance,
  foregroundService: {
    notificationTitle: "Radarin update",
    notificationBody: "Radarin is taking your location..."
  }
};

TaskManager.defineTask("backgroundLocations", ({ data: { locations }, error }) => {
  if (error) {
    return;
  }
  sendLocation(locations[locations.length - 1].coords, locations[locations.length - 1].timestamp);
});

export async function getLocationAsyncStatus() {
  return await Location.hasStartedLocationUpdatesAsync("backgroundLocations");
}

export async function startLocationAsync() {
  let permissions = await Location.requestBackgroundPermissionsAsync();
  let status = await Location.hasServicesEnabledAsync(); // this returns the real state if the request permissions have been granted
  if (status && permissions.status === "granted") {
    Location.startLocationUpdatesAsync("backgroundLocations", optionsAndroid); 
  }
  else if (!status && permissions.status === "granted") {
    showMessage({
      message: "The location permissions are not enabled",
      description: "Please, enable them manually or the application won't work",
      type: "info",
      duration: 15000,
    });
  }
  return;
}

export async function getServicesEnabled(params) {
  return await Location.hasServicesEnabledAsync();
}

export async function stopLocationAsync() {
  if (await getLocationAsyncStatus())
    Location.stopLocationUpdatesAsync("backgroundLocations").then(() => console.log("Stop location taking"));
}

export async function getLocation() {
  let location;
  if (await Location.getBackgroundPermissionsAsync() != "granted"){
    if (AsyncStorage.getItem("backgroundLocation") != "active"){
      await Location.requestBackgroundPermissionsAsync();
      location = await Location.getCurrentPositionAsync();
    } else {
      location = null;
    }
  }else{
    location = await Location.getCurrentPositionAsync();
  }

  return location;
}