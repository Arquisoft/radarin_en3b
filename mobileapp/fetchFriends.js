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
  await fetcher.load(profile).then(async () => { await searchKnows(webId); });

  return friends;
}

export async function getFriendsWithDistance(webId) {
  friendsWithDistance = await getDistances(friends);
  friends = Object.keys(friendsWithDistance);
  console.log(friends);
  friendsFinal =  getNames();

  return friendsFinal;
}

const getNames = () => friends.filter(friend => friendsWithDistance.has(friend.value))
  .map(name => ({ name, fn: store.any(name, VCARD("fn")) }))
  .filter(x => friendsFinal == null || !((x.fn?.value ?? x.name.value) in friendsFinal))
  .reduce((map, x) => ({
    ...map,
    [x.fn?.value ?? x.name.value]: friendsWithDistance.get(x.name.value)
  }), {});


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
