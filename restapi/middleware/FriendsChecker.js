const rdf = require("rdflib");

const friendsChecker = function (requester, friends) {
    const store = rdf.graph();
    const VCARD = rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
    const FOAF = rdf.Namespace("http://xmlns.com/foaf/0.1/");
    const fetcher = new rdf.Fetcher(store);

    /*We only  need to check if the others have added the requester
    because if they have added him we have their permission (it doesn't matter if
    the requester has them added because he is the one who asks for other's data).*/

    const me = store.sym(webId);
    await fetcher.load(webId);
    const names = store.each(me, FOAF("knows"));
    const namesDocs = Array.from(names.map(name => name.doc()));
    await fetcher.load(namesDocs);
    return store.each(null, FOAF("knows"), me)
        .map(webId => ({ webId: webId.value, fn: getNameIfPossible(webId) }));
    if (req.query.webId == null) {
        return res.sendStatus(400);
    }
    if (req.query.webId !== req.claims.webid) {
        return res.sendStatus(403);
    }
    next();
};

module.exports = friendsChecker;