import * as Location from "expo-location";
import {sendLocation} from "./SendLocation";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  console.log("Ask for permissions");
  let status = await Location.requestBackgroundPermissionsAsync();
  
  if (status.status !== "granted") {
    errorMsg = "Permission to access location was denied";
    alert(errorMsg);
    return;
  }

  console.log("Start location taking");
  Location.startLocationUpdatesAsync("backgroundLocations", optionsAndroid);
}

export async function stopLocationAsync() {
  console.log("Stop location taking");
  Location.stopLocationUpdatesAsync("backgroundLocations").then(() => {}).catch(() => {}); //TODO: proper handle
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