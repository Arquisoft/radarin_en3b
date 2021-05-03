import * as Location from "expo-location";

export async function getLocation() {
  return await Location.getCurrentPositionAsync();
}