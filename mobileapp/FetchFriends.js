import { getDistances, getFriendsLocation } from "./FriendsLocation";
import rdfStore from "./utils/RDFStore";

export async function getFriends(webId) {
  const friends = await rdfStore.getFriends(webId);

  //TODO: do it only once
  const locations = await getFriendsLocation(friends);

  return friends.filter(friend => Array.from(Object.keys(locations)).includes(friend.webId));
}

export async function getFriendsWithDistance(friends) {
  const friendsWithDistance = await getDistances(friends);
  if (friendsWithDistance == "No location") {
    return friendsWithDistance;
  }
  return getNames(friendsWithDistance);
}

export const getFriendsNames = (friends) => friends.map(f => f.fn ?? f.webId);

const getNames = (friendsWithDistance) => friendsWithDistance.keys
  .map(name => ({ name, fn: rdfStore.getNameIfPossible(name) }))
  .reduce((map, x) => ({
    ...map,
    [x.fn?.value ?? x.name.value]: friendsWithDistance.get(x.name.value)
  }), {});
