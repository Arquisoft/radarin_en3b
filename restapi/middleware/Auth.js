const jwt = require("jsonwebtoken");
const $rdf = require("rdflib");

const auth = async function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = jwt.decode(token);
    req.claims = { webid: decodedToken.webid };
    if (req.claims.webid == null)
        return res.sendStatus(401);

    const store = $rdf.graph();
    const me = store.sym(req.claims.webid);
    const profile = me.doc();
    const VCARD = new $rdf.Namespace("http://www.w3.org/2006/vcard/ns#");
    const fetcher = new $rdf.Fetcher(store);
    await fetcher.load(profile);
    const key = store.any(me, VCARD("key")).value;
    try {
        jwt.verify(token, key);
    }
    catch (e) {
        console.log(e);
        return res.sendStatus(401);
    }
    next();
};

module.exports = auth;