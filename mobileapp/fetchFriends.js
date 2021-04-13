import { getDistances, getFriendsLocation } from "./FriendsLocation";

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
  await fetcher.load(profile);
  friends = await searchKnows(webId);
  return friends;
}

export async function getFriendsWithDistance() {
  friendsWithDistance = await getDistances(friends);
  console.log(friendsWithDistance);
  if (friendsWithDistance == "No location"){
    console.log(friendsWithDistance);
    return friendsWithDistance;
}
  friendsFinal = getNames();

  return friendsFinal;
}

export function getFriendsNames(){
  return friends.map((f) => {let fn = store.any(f, VCARD("fn")); return fn?.value ?? f.name.value;});
}

const getNames = () => friends.filter(friend => friendsWithDistance.has(friend.value))
  .map(name => ({ name, fn: store.any(name, VCARD("fn")) }))
  .filter(x => friendsFinal == null || !((x.fn?.value ?? x.name.value) in friendsFinal))
  .reduce((map, x) => ({
    ...map,
    [x.fn?.value ?? x.name.value]: friendsWithDistance.get(x.name.value)
  }), {})
  ;

const isFriendship = (name, webId) => store.each(name, FOAF("knows")).some(fof => webId.includes(fof.value));

//Searchs for people that our user knows, adds them to the friend list only if they are indeed friends

async function searchKnows(webId) {
  let names = store.each(store.sym(webId), FOAF("knows"));
  await Promise.all(names.map(name => fetcher.load(store.sym(name).doc())));
  return names.filter(name => isFriendship(name, webId));
}
