import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';

const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);

useEffect(() => {
  (async () => {
    let {status} = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    if (!Location.hasStartedLocationUpdatesAsync()) {
      setErrorMsg("Please, turn on your location");
      return;
    } else {
      setErrorMsg(false);
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  })();

}
, []);

let text = "Waiting for having a valid position...";
if (errorMsg) {
  text = errorMsg;
} else if (location) {
  text = JSON.stringify(location, null, '\t');
}

export async function getLocation() {
  {
    Location.requestPermissionsAsync();
    if (location.coords !== null) {
      sendLocation.sendLocation(location.coords, location.timestamp);
    }
    alert(text); 
  }  
}