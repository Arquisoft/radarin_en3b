const express = require("express");
const TrackedLocation = require("./models/TrackedLocation");
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "^express\.." }]*/
const router = express.Router();
const webIdQueryChecker = require('./middleware/WebIdQueryChecker');

router.post("/locations", async (req, res) => {
    const trackedLocation = new TrackedLocation({
        webId: req.claims.webid,
        coords: req.body.coords,
        timestamp: req.body.timestamp
    });
    await trackedLocation.save();
    res.send(trackedLocation);
});

router.get("/locations", webIdQueryChecker);

router.get("/locations", async (req, res) => {
    const webId = req.query.webId;

    if (req.query.last === "true") {
        const lastLocation = await TrackedLocation.findOne({ webId }).sort({ timestamp: -1 });
        if (lastLocation == null)
            return res.send([]);
        return res.send(lastLocation);
    }

    const userLocations = await TrackedLocation.find({ webId }).sort({ timestamp: -1 });
    if (userLocations == null)
        return res.send([]);
    res.send(userLocations);
});

module.exports = router;