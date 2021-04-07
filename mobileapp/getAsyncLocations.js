import {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import {sendLocation} from './SendLocation';




async function useGetLocation() {
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

  alert(text); 
  
  return location;
}

export async function getLocation() {
  
  let location = await useGetLocation();

  let permission = await Location.requestPermissionsAsync();

  if (location.coords !== null && permission.scope != 'none') {
    sendLocation(location.coords, location.timestamp);
  }

  alert(text); 
   
  return;
}
