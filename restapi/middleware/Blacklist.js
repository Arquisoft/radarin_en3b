const Blacklisted = require("../models/Blacklisted");
const blacklist = async function (req, res, next) {
    const webId = req.claims.webid;
    // false positive
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (await Blacklisted.exists({ webId }))
    {return res.sendStatus(401);}
    next();
};
module.exports = blacklist;