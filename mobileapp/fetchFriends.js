const $rdf = require("rdflib");
const store = $rdf.graph();
const userId = 'https://radarin.inrupt.net/profile/card#me';
const me = store.sym(userId);
const profile = me.doc();
const VCARD = new $rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const fetcher = new $rdf.Fetcher(store);

var parsedNames = [];

fetcher.load(profile).then(response => {
  let userName = store.any(me, VCARD("fn"));
  console.log("Loaded " + userName);
}, err => {
  console.log("Load failed " + err);
}).then(() => {
  let names = store.each(me, FOAF("knows"));
  parseNames(names);
});

function parseNames(names) {
  names.forEach(name => {
    let person = store.sym(name);
    let profile = person.doc();
    fetcher.load(profile).then(response => {
      let namestr = store.any(person, VCARD("fn"));
      
      fetcher.load(profile).then(() => {
          let namesFriends = store.each(person, FOAF("knows"));
      
          namesFriends.forEach(n => {
            if (n.value.split("/",3)[2] == userId.split("/",3)[2]){
              if (namestr != null){
                parsedNames.push(namestr.value);
              } else 
                parsedNames.push(name.value);
            }
          });
        });

    }, err => {
      console.log("Load failed " + err);
    });
  });
  locked = false;
}

export default function fetchFriends() {
  return parsedNames;
}


