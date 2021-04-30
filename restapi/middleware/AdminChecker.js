const Admin = require("../models/Admin");
const adminChecker = async function (req, res, next) {
    const webId = req.claims.webid;
    const isInDb = await Admin.exists({ webId });
    if (isInDb) {
        return next();
    }
    res.sendStatus(401);
};
module.exports = adminChecker;