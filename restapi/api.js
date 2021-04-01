const express = require("express");
const TrackedLocation = require("./models/TrackedLocation");
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "^express\.." }]*/
const router = express.Router();
const webIdQueryChecker = require('./middleware/WebIdQueryChecker');

router.get("/locations", webIdQueryChecker);

router.post("/locations", async (req, res) => {
    const trackedLocation = new TrackedLocation({
        webId: req.claims.webid,
        coords: req.body.coords,
        timestamp: req.body.timestamp
    });
    trackedLocation.save();
    console.log(trackedLocation);
    res.send(trackedLocation);
});

router.get("/locations", async (req, res) => {
    if (req.query.webId == null) {
        return res.sendStatus(400);
    }
    if (req.query.webId !== req.claims.webid) {
        return res.sendStatus(403);
    }

    const webId = req.claims.webid;

    if (req.query.last === "true") {
        const lastLocation = await TrackedLocation.findOne({ webId }).sort({ timestamp: -1 });
        return res.send(lastLocation);
    }

    const userLocations = await TrackedLocation.find({ webId }).sort({ timestamp: -1 });
    res.send(userLocations);
});

router.get("/friendslocations", webIdQueryChecker);

router.get("/friendslocations", async (req, res) => {
    if (req.query.webId == null) {
        return res.sendStatus(400);
    }
    if (req.query.webId !== req.claims.webid) {
        return res.sendStatus(403);
    }

    const friendIds = req.query.friendIds;

    let locations = {};
    for (let webId of friendIds){
        locations[webId] = await TrackedLocation.findOne({ webId }).sort({ timestamp: -1 });
    }

    console.log(locations);
    res.send(locations);
});

module.exports = router;