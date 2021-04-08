import { getDistances } from "./FriendsLocation";

const $rdf = require("rdflib");
const store = $rdf.graph();
const VCARD = new $rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
const FOAF = $rdf.Namespace("http://xmlns.com/foaf/0.1/");
const fetcher = new $rdf.Fetcher(store);

let friends = [];
let friendsWithDistance;
let friendsFinal;

export async function getFriends(webId) {
  const me = store.sym(webId);
  const profile = me.doc();

  //Automatically loads the friends of our user
  await fetcher.load(profile).then(async () => {await searchKnows(webId); });

  return friends;
}

export async function getFriendsWithDistance(webId) {
  const me = store.sym(webId);
  const profile = me.doc();

  //Automatically loads the friends of our user
  await fetcher.load(profile);
  await searchKnows(webId);
  friendsWithDistance = await getDistances(friends);
  friendsFinal = await getNames();
  return friendsFinal;
}

async function getNames() {
  return new Map(friends.filter(friend => friendsWithDistance.has(friend.value))
    .map(name => store.any(name, VCARD("fn"))
      .flatMap(user =>
        user == null && !friendsFinal.has(name.value) ? [[name.value, friendsWithDistance[name.value]]] :
        user != null && !friendsFinal.has(user.value) ? [[user.value, friendsWithDistance[name.value]]] : [])));
}


function isFriendship(name, webId) {
  let namesFriends = store.each(name, FOAF("knows"));
  namesFriends.filter((fof) => webId.includes(fof.value));
  return namesFriends.length > 0;
}

//Searchs for people that our user knows, adds them to the friend list only if they are indeed friends

async function searchKnows(webId) {
  let names = store.each(store.sym(webId), FOAF("knows"));
  for (const name of names) {
    await fetcher.load(store.sym(name).doc()).then(async () => {
      if (isFriendship(name, webId)) {
        friends.push(name);
      }
    });
  }
}
