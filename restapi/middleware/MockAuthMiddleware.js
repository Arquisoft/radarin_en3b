//Mock middleware JUST FOR TESTING
const auth = function (req, res, next) {
    req.claims = { webid: "https://radarin.inrupt.net/profile/card#me" };
    next();
};

module.exports = auth;