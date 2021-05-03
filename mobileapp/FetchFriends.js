import { getFriendsLocation } from "./FriendsLocation";
import { getLocation } from "./GetLocation";
import rdfStore from "./utils/RDFStore";
import { getPreciseDistance } from "geolib";

const MAX_DISTANCE = 2000; //Testing value, should be something like 2000m
const MAX_TIME = 30000000000; //Testing value, should be something like 3600.000ms

export async function getFriends(webId) {
  //Get name and webId from friend
  let friends = await rdfStore.getFriends(webId);

  //get their location
  const locations = await getFriendsLocation(friends);

  //filter the friends that have a location, hence that uses the app
  friends = friends?.filter(friend => locations.some(location => location[0] == friend.webId));

  //calculate distance from friends
  return await getDistances(friends, locations);
}

export async function getDistances(friends, locations) {
  //Get our location for calculating distances
  const myLocation = await getLocation();
  
  //If my location null, we dont have permission, return
  if (myLocation == null) {
    return "No location";
  }

  //Map friends
  const res = locations.map(location => ({
    //we try to get the name, if it does not exist we grab the webId
    name: friends.filter(friend => friend.webId === location[1].webId)[0].fn ?? location[1].webId.split("//")[1].split(".")[0],
    distance: calculateDistance(location[1], myLocation),
    isClose: isClose(myLocation, location),
    mapsUrl: getMapsUrl(location[1])
  }));

  return res;
}

//gets maps url, even if the friend is far and we are not going to use it
function getMapsUrl(coordinates) {
  const lat = coordinates.coords.latitude;
  const long = coordinates.coords.longitude;
  return "https://www.google.com/maps/dir/?api=1&destination=".concat(lat).concat(",").concat(long).concat("&travelmode=walking");
}

//calculates distance between two locations
function calculateDistance(friendLoc, myLoc) {
  return getPreciseDistance(
    { latitude: friendLoc.coords.latitude, longitude: friendLoc.coords.longitude },
    { latitude: myLoc.coords.latitude, longitude: myLoc.coords.longitude }
  );
}

//returns true if the locations are close in distance and time
function isClose(myLocation, location) {
  const date = Date.now();
  const distance = calculateDistance(location[1], myLocation);

  return (date - location[1].timestamp) < MAX_TIME && distance <= MAX_DISTANCE;
}