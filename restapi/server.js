const express = require("express");
const promBundle = require("express-prom-bundle");
const cors = require("cors");
const mongoose = require("mongoose");
const api = require("./endpoints/api");
const admin = require("./endpoints/admin");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function connect() {
    //The MONGO_URI variable is the connection string to MongoDB Atlas (for production). This env variable is created in heroku.
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Radarin RestAPI",
                version: "1.0.0",
            },
            tags: [
                {
                    name: "admin",
                    description: "Endpoint only for admins"
                },
                {
                    name: "api",
                    description: "Endpoint for api usage"
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                    }
                }
            },
            security: [
                {
                    bearerAuth: []
                }
            ]
        },
        apis: ["./endpoints/*.js"],
    };
    const specs = swaggerJsDoc(options);
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        const app = express();

        //Monitoring middleware
        const metricsMiddleware = promBundle({ includeMethod: true });
        app.use(metricsMiddleware);
        app.options("*", cors());
        app.use(cors());
        app.use(express.json());
        app.use("/api", api);
        app.use("/admin", admin);
        app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
        app.listen(process.env.PORT || 5000, () => {
            // eslint-disable-next-line no-console
            console.log("Server has started! Using db in " + mongoUri);
        });
    });
};

// Connect to MongoDB database, the wait is for giving time to mongodb to finish loading
setTimeout(connect, 5000);