const webIdQueryChecker = function (req, res, next) {
    if (req.query.webId == null) {
        return res.sendStatus(400);
    }
    if (req.query.webId !== req.claims.webid) {
        return res.sendStatus(403);
    }
    next();
}

module.exports = webIdQueryChecker;