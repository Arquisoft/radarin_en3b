const mongoose = require("mongoose");

const blacklisted = new mongoose.Schema({
    webId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Blacklisted", blacklisted);