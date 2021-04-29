const mongoose = require("mongoose");

const blacklisted = mongoose.Schema({
    webId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Blacklisted", blacklisted);