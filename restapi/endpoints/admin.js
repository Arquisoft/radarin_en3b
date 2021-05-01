const express = require("express");
const TrackedLocation = require('../models/TrackedLocation');
const Blacklisted = require("../models/Blacklisted");
const router = express.Router();
const adminChecker = require("../middleware/AdminChecker");
const auth = require("../middleware/Auth");
const blacklist = require("../middleware/Blacklist");

router.use(auth);
router.use(blacklist);
router.use(adminChecker);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         webId:
 *           type: string
 *           description: The user webId.
 *           example: https://radarin.inrupt.net/profile/card#me
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Retrieve a list of users that have uploaded a location.
 *     description: Retrieve a list of users have uploaded a location.
 *     tags:
 *     - "admin"
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/users", async (req, res) => {
    const users = await TrackedLocation.distinct("webId");
    if (users == null)
        return res.send([]);
    res.send(users);
});

/**
 * @swagger
 * /admin/blacklist:
 *   get:
 *     summary: Retrieve a list of banned users.
 *     description: Retrieve a list of users that can't access the api anymore.
 *     tags:
 *     - "admin"
 *     responses:
 *       200:
 *         description: A list of banned users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/blacklist", async (req, res) => {
    const blacklist = await Blacklisted.find({});
    res.send(blacklist);
});

/**
 * @swagger
 * /admin/blacklist:
 *   post:
 *     summary: Bans an user.
 *     tags:
 *     - "admin"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       400:
 *         description: There is no webId in the body
 *       200:
 *         description: The user is banned or was already banned
 */
router.post("/blacklist", async (req, res) => {
    if (req.body.webId == null)
        return res.sendStatus(400);

    if (await Blacklisted.exists({webId: req.body.webId}))
        return res.sendStatus(200);

    const blacklisted = new Blacklisted({webId: req.body.webId});
    await blacklisted.save();
    res.sendStatus(200);
});

/**
 * @swagger
 * /admin/blacklist/{webId}:
 *   delete:
 *     summary: Pardons a banned user.
 *     description: Removes an user from the blacklist.
 *     tags:
 *     - "admin"
 *     parameters:
 *     - name: "webId"
 *       in: "path"
 *       description: "The user you want to unban"
 *       required: true
 *       type: "string"
 *     responses:
 *       204:
 *         description: The user has been successfully unbanned
 *       200:
 *         description: The user was not banned so it could not be pardoned
 */
router.delete("/blacklist/:id", async (req, res) => {
    const webId = req.params.id;
    const d = await Blacklisted.deleteOne({webId});
    return d.deletedCount > 0 ?
        res.sendStatus(204) :
        res.sendStatus(404);
});

module.exports = router;