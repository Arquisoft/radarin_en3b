import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLocation() {
  let takeLocation =  await AsyncStorage.getItem("locationStatus");
  console.log("Takeloc"+takeLocation)
  let status = await Location.hasServicesEnabledAsync();
  if (takeLocation === "true" && status){
    return await Location.getCurrentPositionAsync();
  }
  else{
    return "No location";
  }
    
}