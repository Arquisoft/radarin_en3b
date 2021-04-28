import { getDistances, getFriendsLocation } from "./FriendsLocation";
import rdfStore from "./utils/RDFStore";

export async function getFriends(webId) {
  const friends = await rdfStore.getFriends(webId);

  //TODO: do it only once
  const locations = await getFriendsLocation(friends);

  return friends.filter(friend => locations.some(location => location.webId == friend.webId));
}

export async function getFriendsWithDistance(friends) {
  const friendsWithDistance = await getDistances(friends);
  if (friendsWithDistance == "No location") {
    return friendsWithDistance;
  }

  return getNames(friends, friendsWithDistance);
}

export const getFriendsNames = (friends) => friends.map(f => f.fn ?? f.webId);


const getNames = (friends, friendsWithDistance) => friends.filter(friend => friendsWithDistance.has(friend.webId))
  .reduce((map, x) => ({
    ...map,
    [x.fn ?? x.webId]: { value: friendsWithDistance.get(x.webId).value, mapsUrl: friendsWithDistance.get(x.webId).mapsUrl }
  }), {});