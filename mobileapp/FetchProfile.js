const $rdf = require("rdflib");
const store = $rdf.graph();
const VCARD = new $rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
const fetcher = new $rdf.Fetcher(store);


export async function setProfile(webId) {
    const me = store.sym("https://radarin.inrupt.net/profile/card#me");
    const profile = me.doc();

    let result;

    await fetcher.load(profile).then(() => {
        const userName = store.any(me, VCARD("fn"));

        result = { webId: webId, fn: userName.value };

    }, err => {
        alert("Load failed " + err);
    });

    return result;
}