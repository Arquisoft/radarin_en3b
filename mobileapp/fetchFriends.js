import { getDistance } from "./FriendsLocation";

const $rdf = require("rdflib");
const store = $rdf.graph();
const VCARD = new $rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
const FOAF = $rdf.Namespace("http://xmlns.com/foaf/0.1/");
const fetcher = new $rdf.Fetcher(store);

var parsedNames = [];
var friendsWithDistance = {};

export async function getFriends(webId) {
  const me = store.sym(webId);
  const profile = me.doc();

  //Automatically loads the friends of our user
  await fetcher.load(profile).then(async () => { await searchKnows(webId); });

  return parsedNames;
}

function isFriendship(name, webId) {
  let namesFriends = store.each(name, FOAF("knows"));
  namesFriends.filter((fof) => webId.includes(fof.value));
  return namesFriends.length > 0;
}

//Searchs for people that our user knows, adds them to the friend list only if they are indeed friends


export function fetchFriends() {
  return parsedNames;
}

export function fetchFriendsDistance() {
  return friendsWithDistance;
}

async function searchKnows(webId) {
  let names = store.each(store.sym(webId), FOAF("knows"));
  for (const name of names) {
    await fetcher.load(store.sym(name).doc()).then(() => {
      if (isFriendship(name, webId)) {
        var user = store.any(name, VCARD("fn"));
        if (user == null) {
          if (!parsedNames.includes(name.value)){
            parsedNames.push(name.value);
            friendsWithDistance[name.value] = getDistance(user.value);
          }
        } else {
          if (!parsedNames.includes(user.value)){
            parsedNames.push(user.value);
            friendsWithDistance[user.value] = getDistance(user.value);
          }
        }
      }
    });
  }
}
