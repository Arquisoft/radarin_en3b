import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLocation() {
  console.log("entra")
  let takeLocation =  AsyncStorage.getItem("locationStatus");
  console.log("Takeloc"+takeLocation)
  if (takeLocation == "true"){
    return await Location.getCurrentPositionAsync();
  }
  else{
    return "No location";
  }
    
}