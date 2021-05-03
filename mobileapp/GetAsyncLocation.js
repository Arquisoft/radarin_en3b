import * as Location from "expo-location";
import {sendLocation} from "./SendLocation";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fiveMin = 300000; //minumum interval of time to send the location -> 5 min
const minDistance = 500; //minimum interval of distance to send the location -> 500 m

const optionsAndroid = {
  accuracy: Location.LocationAccuracy.High,
  timeInterval: fiveMin,
  distanceInterval: minDistance,
  foregroundService: {
    notificationTitle: "Radarin update",
    notificationBody: "Radarin is taking your location..."
  }
};

export async function getLocationAsync() {
  let status = await Location.requestBackgroundPermissionsAsync();
  let errorMsg;
  let backgroundLocation = await Location.hasStartedLocationUpdatesAsync("backgroundLocations");
  let savedState = await AsyncStorage.getItem("backgroundLocations");

  if (status.status !== "granted") {
    errorMsg = "Permission to access location was denied";
    alert(errorMsg);
    return;
  }

  if (savedState === "active") {
    if (!backgroundLocation) {
      Location.startLocationUpdatesAsync("backgroundLocations", optionsAndroid);
      TaskManager.defineTask("backgroundLocations", ({ data: { locations }, error }) => {
        if (error) {
          return;
        }
        sendLocation(locations[locations.length - 1].coords, locations[locations.length - 1].timestamp);
      });
    }
  } else {
    if (backgroundLocation) {
      Location.stopLocationUpdatesAsync("backgroundLocations").then(() => {}).catch(() => {}); //TODO: proper handle
    }
  }
  return;
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