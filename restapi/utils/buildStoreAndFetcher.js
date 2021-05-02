const rdf = require("rdflib");

const buildStoreAndFetcher = function buildStoreAndFetcher() {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);
    return {store, fetcher};
};

module.exports = buildStoreAndFetcher;