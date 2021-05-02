const express = require("express");
const TrackedLocation = require("../models/TrackedLocation");
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "^express\.." }]*/
const router = express.Router();
const webIdQueryChecker = require("../middleware/WebIdQueryChecker");
const auth = require("../middleware/Auth");
const blacklist = require("../middleware/Blacklist");

router.use(auth);
router.use(blacklist);

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         webId:
 *           type: string
 *           description: The user webId.
 *           example: https://radarin.inrupt.net/profile/card#me
 *         coords:
 *           type: object
 *           description: The location coords
 *           properties:
 *             accuracy:
 *               type: number
 *             altitude:
 *               type: number
 *             altitudeAccuracy:
 *               type: number
 *             heading:
 *               type: number
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *             speed:
 *               type: number
 *         timestamp:
 *           type: number
 *           description: The timestamp made when the location was saved.
 *           example: 1509152059444
 */

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Saves a new location.
 *     tags:
 *     - "api"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: The location to save
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
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

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get the locations of a given user.
 *     description: Returns the location of an user. It can only be your own webId or the webId of one of your friends. Otherwise, it will return an error.
 *     tags:
 *     - "api"
 *     parameters:
 *     - name: "webId"
 *       in: "query"
 *       description: "The user you want the locations from"
 *       required: true
 *       type: "string"
 *     - name: "last"
 *       in: "query"
 *       description: "True if you only want the last location"
 *       required: false
 *       type: "boolean"
 *       default: false
 *     responses:
 *       401:
 *         description: The location you have asked for is not available for you. It is not your webId nor your friend's webId
 *       200:
 *         description: The user was not banned so it could not be pardoned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
router.get("/locations", async (req, res) => {
    const webId = req.query.webId;

    if (req.query.last === "true") {
        const lastLocation = await TrackedLocation.findOne({webId}).sort({timestamp: -1});
        if (lastLocation == null)
        {return res.send([]);}
        return res.send(lastLocation);
    }

    const userLocations = await TrackedLocation.find({webId}).sort({timestamp: -1});
    if (userLocations == null)
    {return res.send([]);}
    res.send(userLocations);
});

module.exports = router;