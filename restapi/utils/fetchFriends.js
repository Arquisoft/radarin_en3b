const rdf = require("rdflib");
const buildStoreAndFetcher = require("./buildStoreAndFetcher");

const fetchFriends = async function fetchFriends(webId) {
    const {store, fetcher} = buildStoreAndFetcher();
    const FOAF = rdf.Namespace("http://xmlns.com/foaf/0.1/");

    const me = store.sym(webId);
    await fetcher.load(webId);
    const names = store.each(me, FOAF("knows"));
    const namesDocs = names.map(name => name.doc());
    await fetcher.load(namesDocs);
    return store.each(null, FOAF("knows"), me)
        .map(webId => webId.value);
}

module.exports = fetchFriends;