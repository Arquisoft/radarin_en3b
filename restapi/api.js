const express = require("express");
const TrackedLocation = require("./models/TrackedLocation");
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "^express\.." }]*/
const router = express.Router();

router.post("/locations", async (req, res) => {
    const trackedLocation = new TrackedLocation({
        webId: req.claims.webid,
        coords: req.body.coords,
        timestamp: req.body.timestamp
    });
    trackedLocation.save();
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

module.exports = router;