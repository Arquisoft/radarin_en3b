const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    webId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Admin", admin);