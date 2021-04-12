const $rdf = require("rdflib");
const store = $rdf.graph();
const VCARD = new $rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
const fetcher = new $rdf.Fetcher(store);


export async function setProfile(webId) {
    const me = store.sym(webId);
    const profile = me.doc();

    try {
        await fetcher.load(profile);
        const userName = store.any(me, VCARD("fn"));
        return { webId: webId, fn: userName.value };
    } catch (e) {
        alert("Load failed: " + e);

    }
}