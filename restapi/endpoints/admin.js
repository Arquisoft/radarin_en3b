const express = require("express");
const TrackedLocation = require('../models/TrackedLocation');
const Blacklisted = require("../models/Blacklisted");
const router = express.Router();
const adminChecker = require("../middleware/AdminChecker");

router.use(adminChecker);

router.get("/users", async (req, res) => {
    const users = await TrackedLocation.distinct("webId");
    if (users == null)
        return res.send([]);
    res.send(users);
});

router.get("/blacklist", async (req, res) => {
    const blacklist = await Blacklisted.find({});
    res.send(blacklist);
});

router.post("/blacklist", async (req, res) => {
    if (req.body.webId == null)
        return res.sendStatus(400);

    if (await Blacklisted.exists({ webId: req.body.webId }))
        return res.sendStatus(200);

    const blacklisted = new Blacklisted({ webId: req.body.webId });
    await blacklisted.save();
    res.sendStatus(200);
});

router.delete("/blacklist/:id", async (req, res) => {
    const webId = req.params.id;
    const d = await Blacklisted.deleteOne({ webId });
    return d.deletedCount > 0 ?
        res.sendStatus(204) :
        res.sendStatus(404);
});

module.exports = router;