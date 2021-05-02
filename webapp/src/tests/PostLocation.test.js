import "@testing-library/jest-dom/extend-expect";
import { SolidNodeClient } from "solid-node-client";
import PostLocation from "../components/locations/PostLocation";
const solid = require("@inrupt/solid-client");

solid.saveSolidDatasetAt = jest.fn();

test("testing qr page, key management and location fetching", async () => {
    const client = new SolidNodeClient({
        handlers: { https: "solid-client-authn-node" }
    });

    let sessionNew = await client.login({
        refreshToken: "dae72e47ab68c32ca86de646b1cad4ba",
        clientId: "97ea8c6eb8c886fbe15b8024de6a94f7",
        clientSecret: "0d7e6545543bbb461c8cd5d4b60a10f9",
        oidcIssuer: "https://solidcommunity.net",
    });

    const title = "test title";
    const description = "test description";
    const photo = new Blob();
    const coords = "[0,0]";

    await PostLocation(sessionNew, title, description, photo, coords);

    sessionNew.logout();
});