import BuildToken from "./utils/BuildToken";

const apiEndPoint = "https://radarinen3brestapi.herokuapp.com/api";

export async function getFriendsLocation(friends) {
  const auth = await BuildToken();
  try {
    const responses = await Promise.all(
      friends.map(f => fetch(`${apiEndPoint}/locations?webId=${encodeURIComponent(f.webId)}&last=true`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + auth }
      })));
        
    const locations = await Promise.all(responses.map(r => r.json()));
        
    return locations.map(location => [location.webId, location]);
  } catch (error) {
    console.log("Error loading locations :" + error);
    throw error;
  }
}






