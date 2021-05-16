import Api from "../../api/API";

export default async function postCurrentLocation(webId, location) {
    try {
        const coords = { 
            accuracy: location.coords.accuracy,
            altitude: 100,
            altitudeAccuracy: 5,
            heading: 0,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            speed: 0
        };
        await Api.postLocation({webId, coords, timestamp: Date.now() });
    } catch(err) {
        console.log(err);
    }
}