const rdf = require("rdflib");
const buildStoreAndFetcher = require("./buildStoreAndFetcher");

const fetchFriends = async function fetchFriends(webId) {
    const {store, fetcher} = buildStoreAndFetcher();
    // eslint-disable-next-line new-cap
    const FOAF = rdf.Namespace("http://xmlns.com/foaf/0.1/");

    const me = store.sym(webId);
    await fetcher.load(webId);
    // eslint-disable-next-line new-cap
    const names = store.each(me, FOAF("knows"));
    const namesDocs = names.map((name) => name.doc());
    await fetcher.load(namesDocs);
    // eslint-disable-next-line new-cap
    return store.each(null, FOAF("knows"), me)
        .map((webId) => webId.value);
};

module.exports = fetchFriends;