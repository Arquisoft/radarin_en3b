const Admin = require("../models/Admin");
const adminChecker = async function (req, res, next) {
    const { webId } = req.claims;
    const newAdmin = new Admin({ webId: "https://radarin.inrupt.net/profile/card#me" });
    await newAdmin.save();
    if (await Admin.exists({ webId })) {
        return next();
    }
    res.sendStatus(401);
};
module.exports = adminChecker;