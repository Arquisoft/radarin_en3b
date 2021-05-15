import Api from "../../api/API";

export default async function postCurrentLocation(webId, location) {
    try {
        const coords = {coords: { 
            accuracy: location.coords.accuracy,
            altitude: 100,
            altitudeAccuracy: 5,
            heading: 0,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            speed: 0
        }};
        console.log(coords);
        console.log(JSON.stringify({webId, coords, timestamp: Date.now()}));
        const response = await Api.postLocation({webId, coords});
        console.log(response);
    } catch(err) {
        console.log(err);
    }
}