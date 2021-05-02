/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "^mongoose\.." }]*/
const mongoose = require("mongoose");

const geolocationSchema = new mongoose.Schema({
    accuracy: { type: Number, required: true },
    altitude: Number,
    altitudeAccuracy: Number,
    heading: Number,
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    speed: Number
});

const trackedLocationSchema = new mongoose.Schema({
    webId: {type: String, required: true},
    coords: {type: geolocationSchema, required: true},
    timestamp: {type: Number, required: true}
});

module.exports = mongoose.model("TrackedLocation", trackedLocationSchema);
