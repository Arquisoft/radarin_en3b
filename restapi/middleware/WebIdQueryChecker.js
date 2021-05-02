const friendsStore = require("./FriendsStore");

const webIdQueryChecker = function (req, res, next) {
    const requesterWebId = req.claims.webid;
    const queryWebId = req.query.webId;
    if (queryWebId == null) {
        return res.sendStatus(400);
    }
    //It seems I can't use async functions in middleware ... :(
    friendsStore.areFriends(requesterWebId, queryWebId).then((areFriends) => {
        if (queryWebId !== requesterWebId && !areFriends) {
            return res.sendStatus(403);
        }
        next();
    });
};

module.exports = webIdQueryChecker;