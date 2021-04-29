const Blacklisted = require("../models/Blacklisted");
const blacklistMiddleware = async function (req, res, next) {
    const { webId } = req.claims;
    if (await Blacklisted.exists({ webId }))
        return res.sendStatus(401);
    next();
};
module.exports = blacklistMiddleware;