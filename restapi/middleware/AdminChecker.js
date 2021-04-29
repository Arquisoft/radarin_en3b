const Admin = require("../models/Admin");
const adminChecker = async function (req, res, next) {
    const webId = req.claims.webid;
    if (webID == "https://radarin.inrupt.net/profile/card#me" || await Admin.exists({ webId })) {
        return next();
    }
    res.sendStatus(401);
};
module.exports = adminChecker;