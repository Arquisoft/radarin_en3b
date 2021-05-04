const jwt = require("jsonwebtoken");
const fetchPKey = require("../utils/fetchPKey");

const auth = async function (req, res, next) {
    const authHeader = req.headers["authorization"];

    if (authHeader == null)
    {return res.sendStatus(401);}

    const token = authHeader && authHeader.split(" ")[1];

    // You can't time-attack this, it's just checking if it is empty
    // eslint-disable-next-line security/detect-possible-timing-attacks
    if (token == null)
    {return res.sendStatus(401);}

    const decodedToken = jwt.decode(token);

    if (decodedToken?.webid == null)
    {return res.sendStatus(401);}

    req.claims = {webid: decodedToken.webid};


    const key = await fetchPKey(req.claims.webid);

    //alert(key);

    try {
        jwt.verify(token, key);
    } catch (e) {
        return res.sendStatus(401);
    }
    next();
};

module.exports = auth;