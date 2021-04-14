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
        /*
         a?.b --> if a is not null it access it's field b
         a ?? b --> if a is null returns b
         That way we are returning allways or the value of the userName or an empty String
         This is done as a user may or may not have it's username fullfilled, as it happened in my case, and can give raise a nullpointer exception
        */
        return { webId: webId, fn: userName?.value ?? "" }; 
    } catch (e) {
        alert("Load failed: " + e);

    }
}