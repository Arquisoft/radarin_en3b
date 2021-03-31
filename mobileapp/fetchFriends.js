import { Menu } from "react-native-paper";
import { getDistance } from "./FriendsLocation";

const $rdf = require("rdflib");
const store = $rdf.graph();

//For testing purposes, must be changed later
var userId;

var me;
var profile;
var VCARD;
var FOAF;
var fetcher;

var parsedNames = [];
var friendsIds = [];
var friendsWithDistance = {};

export async function setWebId(navigation, webId){
  webId = webId.replace('"','');
  webId = webId.replace('"','');
  userId = webId;
  me = store.sym(userId);
  profile = me.doc();
  VCARD = new $rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
  FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
  fetcher = new $rdf.Fetcher(store);
  //Automatically loads the friends of our user
  await fetcher.load(profile).then(response => {
    let userName = store.any(me, VCARD("fn"));
    console.log("Loaded " + userName);
  }, err => {
    console.log("Load failed " + err);
  }).then(async () => {await searchKnows()});

  //Checks if the friendship is bidirectional for leaving out stalkers
function isFriendship(name) {
  let namesFriends = store.each(name, FOAF("knows"));
  namesFriends.filter(fof => userId.includes(fof.value));
  return namesFriends.length > 0;
}

//Searchs for people that our user knows, adds them to the friend list only if they are indeed friends
async function searchKnows(){
  
let names = store.each(me, FOAF("knows"));
    for (const name of names) {
      friendsIds.push(name);
      await fetcher.load(store.sym(name).doc()).then(() => {
        if (isFriendship(name)){
          var user = store.any(name, VCARD("fn"));
          if (user == null){
            if (!parsedNames.includes(name.value)){
              parsedNames.push(name.value);
              friendsWithDistance[name.value] = getDistance(user.value);
            }
          }else{
            if (!parsedNames.includes(user.value)){
              parsedNames.push(user.value);
              friendsWithDistance[user.value] = getDistance(user.value);
            }
          }

        }
      });
    }
}
}

export function fetchFriends() {
  return parsedNames;
}

export function fetchFriendsDistance() {
  return friendsWithDistance;
}


