const rdf = require("rdflib");
const buildStoreAndFetcher = require("./buildStoreAndFetcher");

const fetchPKey = async function fetchPKey(webId) {
    const {store, fetcher} = buildStoreAndFetcher();

    const prFileUrl = webId.split("profile")[0] + "public/RadarinPKey/publicKey.ttl";

    const prKeyFile = store.sym(prFileUrl);

    const AUTH = new rdf.Namespace("https://www.w3.org/ns/auth/cert#");

    await fetcher.load(prKeyFile);
    // eslint-disable-next-line new-cap
    const keyNode = store.any(prKeyFile, AUTH("RSAPublicKey"));

    return keyNode.value;
};

module.exports = fetchPKey;