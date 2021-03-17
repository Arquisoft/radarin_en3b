const $rdf = require("rdflib");
const store = $rdf.graph();

//For testing purposes, must be changed later
const userId = 'https://radarin.inrupt.net/profile/card#me';

const me = store.sym(userId);
const profile = me.doc();
const VCARD = new $rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const fetcher = new $rdf.Fetcher(store);

var parsedNames = [];

//Automatically loads the friends of our user
fetcher.load(profile).then(response => {
  let userName = store.any(me, VCARD("fn"));
  console.log("Loaded " + userName);
}, err => {
  console.log("Load failed " + err);
}).then(() => {
  searchFriends();
});

//Searchs for people that our user knows, adds them to the friend list only if they are indeed friends
function searchFriends() {
  let names = store.each(me, FOAF("knows"));
  names.forEach(name => {
    fetcher.load(store.sym(name).doc()).then(() => {
      if (isFriendship(name))
        parsedNames.push(store.any(name, VCARD("fn")).value);
    });
  });
}

//Checks if the friendship is bidirectional for leaving out stalkers
function isFriendship(name) {
  let namesFriends = store.each(name, FOAF("knows"));
  namesFriends.filter(fof => userId.includes(fof.value));
  return namesFriends.length > 0;
}

export default function fetchFriends() {
  return parsedNames;
}


