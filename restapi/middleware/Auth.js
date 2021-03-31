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

    const prFileUrl = req.claims.webid.split("profile")[0] + "public/RadarinPKey/publicKey.ttl";

    const prKeyFile = store.sym(prFileUrl);

    const AUTH = new $rdf.Namespace("https://www.w3.org/ns/auth/cert#");

    fetcher = new $rdf.Fetcher(store);
    await fetcher.load(prKeyFile);

    const key = store.any(prKeyFile, AUTH("RSAPublicKey"));

    //alert(key);

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