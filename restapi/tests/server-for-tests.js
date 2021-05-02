/*
This server file allow to start the restapi using an in-memory database
This will be handy for testing
*/

const { MongoMemoryServer } = require("mongodb-memory-server");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const api = require("../endpoints/api");
// const adminChecker = require("../middleware/AdminChecker");
const admin = require("../endpoints/admin");
let mongod, server;
module.exports.startdb = async () => {
    mongod = new MongoMemoryServer({ instance: { port: 27017, dbName: "testdb" } });
    const mongoUri = await mongod.getUri();
    // eslint-disable-next-line no-console
    console.log(mongoUri);

};

module.exports.startserver = async () => {
    // eslint-disable-next-line no-console
    console.log("conecceting to database");
    await mongoose.connect("mongodb://127.0.0.1:27017/testdb?", { useNewUrlParser: true, useUnifiedTopology: true });
    // eslint-disable-next-line no-console
    console.log("connected");
    const app = express();

    app.use(cors());
    app.options("*", cors());
    app.use(express.json());
    app.use("/api", api);
    app.use("/admin", admin);
    // admin.use(adminChecker);

    server = await app.listen(5000);
    // eslint-disable-next-line no-console
    console.log("Server has started!");
    return app;
};

module.exports.closeServer = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await server.close();
};

module.exports.closeDB = async () => {
    await mongod.stop();
};

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    // eslint-disable-next-line guard-for-in
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};