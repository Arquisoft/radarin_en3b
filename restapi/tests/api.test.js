/* eslint-disable no-undef */
const request = require("supertest");
const server = require("./server-for-tests");
const friendsStore = require("../middleware/FriendsStore");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const fetchFriends = require("../utils/fetchFriends");
const fetchPKey = require("../utils/fetchPKey");
const nonAdded = "https://efecto2k.solidcommunity.net/profile/card#me";
const adminWebId = "https://radarin.inrupt.net/profile/card#me";
const carmenWebId = "https://carmen279.inrupt.net/profile/card#me";
const radarinFriends = [carmenWebId];
const carmenFriends = [adminWebId];
const requejoFriends = [];
const privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIICXQIBAAKBgQCC7q2NLt0Yveri2iq0ML8r2Thajzi0zZgVpZqO/60RQwamZv1NVaSWPntc\n" +
    "F5fFN3bUAEPmtCTy0GPgw6Kv/k9g3RgKNuJoV7NFXi6v0K+e5AxZh1uTgc7cleBYAiWR5AUD\n" +
    "5MGbFlftWabyERope2s4cLmkG/tFBMpEOcLncN8ZTQIDAQABAoGARAQzWh1XM+ws4e3Ns0+D\n" +
    "cAbmtHykS6Bl+hDOSqzdPhNgl/72ZT8xQe9xa/TBnezjKNx+aZF5hD3nNLLMh7qHhxzeFyjw\n" +
    "u7K3qPee06HgMxssFh3kktQm6Qh65k56ODS9WDM9wc32IKlWzNaOohaEu5h0c+Ym+oAmT/Zs\n" +
    "IUk6CC0CQQDUhdyIs6AAKyfIqb39+NjD78nTFuf8IcjaUJHAQrFfT9dxpUQ7ODcBeeRwS3D+\n" +
    "Jt/o8ws6mYy0IJu+eYaGEDL/AkEAnbfMT4k+kSaPeq0oI23ZsDKwXm2s+6ad0SxNFgGYrYL9\n" +
    "PPLHZPDoD0GeHKRWDQpXAKSowcdCAq4ImtZsW/GPswJBAIntzvGR0tgJKirbr4kzhku0RsKP\n" +
    "bUSAEMFP5ShooIGBagxB/ISKuXhlydLvw4fPZybjBnijy2PkffAjIyHDRbUCQFngmtKccIZB\n" +
    "BjSvppcCC7LIQA+fypsh6P+BknA++qWuZuerpotUabn/9710vQDzan8YVn8PMQPb71Vlahy/\n" +
    "PNcCQQCCqp1ygE19gQx/XU7o068Z3Tp+Uy6MWmAtkYWiEA9pk8x7KmN09/pdCxr1OnQ0ltVB\n" +
    "vgHCGt5U38Off7fHRqB9\n" +
    "-----END RSA PRIVATE KEY-----";

const pKey = "-----BEGIN RSA PUBLIC KEY-----\n" +
    "MIGJAoGBAILurY0u3Ri96uLaKrQwvyvZOFqPOLTNmBWlmo7/rRFDBqZm/U1VpJY+e1wXl8U3\n" +
    "dtQAQ+a0JPLQY+DDoq/+T2DdGAo24mhXs0VeLq/Qr57kDFmHW5OBztyV4FgCJZHkBQPkwZsW\n" +
    "V+1ZpvIRGil7azhwuaQb+0UEykQ5wudw3xlNAgMBAAE=\n" +
    "-----END RSA PUBLIC KEY-----";


function buildTestToken(webId) {
    const payload = {
        sub: "test",
        webid: webId
    };
    return "Bearer " + jwt.sign(payload, privateKey, {algorithm: "RS256", noTimestamp: true});
}

jest.mock("../utils/fetchFriends");

jest.mock("../utils/fetchPKey");
fetchFriends.mockImplementation((webId) => {
    switch (webId) {
    case nonAdded:
        return requejoFriends;
    case carmenWebId:
        return carmenFriends;
    case adminWebId:
        return radarinFriends;
    }
}
);
fetchPKey.mockReturnValue(pKey);
beforeAll(async () => {
    await server.startdb();
    await server.startserver();
    const admin = new Admin({webId: adminWebId});
    await admin.save();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    await server.clearDatabase();
    //Clear cache
    friendsStore._cache = friendsStore._cache.empty();
    const admin = new Admin({webId: adminWebId});
    await admin.save();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await server.closeServer(); //finish the server
    await server.closeDB();
});

/**
 * Product test suite.
 */
describe("Locations saving and fetching", () => {
    const timestamp = 1509152059444;
    const coords = {
        accuracy: 52,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 27.380583,
        longitude: 33.631839,
        speed: null
    };
    it("Can be created correctly", async () => {
        const response = await request(app).post("/api/locations")
            .send({webId: adminWebId, coords, timestamp})
            .set("Accept", "application/json").set("authorization", buildTestToken(adminWebId));
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(adminWebId);
        expect(response.body.coords.latitude).toBe(coords.latitude);
        expect(response.body.timestamp).toBe(timestamp);
    });
    it("Can be listed", async () => {
        await request(app).post("/api/locations")
            .send({webId: adminWebId, coords, timestamp})
            .set("Accept", "application/json").set("authorization", buildTestToken(adminWebId));
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(adminWebId)}`).set("authorization", buildTestToken(adminWebId));
        const last = response.body[response.body.length - 1];
        expect(last.webId).toBe(adminWebId);
        expect(last.coords.latitude).toBe(coords.latitude);
        expect(last.timestamp).toBe(timestamp);
        expect(response.statusCode).toBe(200);
    });
    it("Throws an error when not passing query parameter", async () => {
        await request(app).get("/api/locations")
            .send({webId: adminWebId, coords, timestamp})
            .set("Accept", "application/json").set("authorization", buildTestToken(adminWebId));
        const response = await request(app).get("/api/locations").set("authorization", buildTestToken(adminWebId));
        expect(response.statusCode).toBe(400);
    });
    it("Gets ONLY a single (the last) location", async () => {
        await request(app).post("/api/locations")
            .send({webId: adminWebId, coords, timestamp})
            .set("Accept", "application/json").set("authorization", buildTestToken(adminWebId));
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(adminWebId)}&last=true`).set("authorization", buildTestToken(adminWebId));
        const last = response.body;
        expect(last.webId).toBe(adminWebId);
        expect(last.coords.latitude).toBe(coords.latitude);
        expect(last.timestamp).toBe(timestamp);
        expect(response.statusCode).toBe(200);
    });
});

describe("Locations security testing", () => {
    it("Can get friend locations", async () => {
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(carmenWebId)}`).set("authorization", buildTestToken(adminWebId));
        expect(response.statusCode).toBe(200);
    });
    it("Can't get non-added people locations", async () => {
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(nonAdded)}`).set("authorization", buildTestToken(adminWebId));
        expect(response.statusCode).toBe(403);
    });
});

describe("FriendsStore specific testing", () => {

    it("Works when cache is hit for radarin webId", async () => {
        //load radarin friends into cache
        friendsStore._cache.set(adminWebId, radarinFriends);

        //Test if the request goes well when cache is hit
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(carmenWebId)}`).set("authorization", buildTestToken(adminWebId));
        expect(response.statusCode).toBe(200);
    });

    it("Works when cache is hit for radarin friend but not for radarin", async () => {
        //load radarin friends into cache
        friendsStore._cache.set(carmenWebId, carmenFriends);

        //Test if the request goes well when cache is hit
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(carmenWebId)}`).set("authorization", buildTestToken(adminWebId));
        expect(response.statusCode).toBe(200);
    });
});


describe("Admin endpoints testing", () => {
    const timestamp = 1509152059444;
    const coords = {
        accuracy: 52,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 27.380583,
        longitude: 33.631839,
        speed: null
    };


    it("Can get the list of users", async () => {
        await request(app).post("/api/locations")
            .send({webId: adminWebId, coords, timestamp})
            .set("Accept", "application/json");
        const response = await request(app).get("/admin/users").set("authorization", buildTestToken(adminWebId));
        expect(response.statusCode).toBe(200);
    });

    it("Can get list of users if empty", async () => {
        const response = await request(app).get("/admin/users").set("authorization", buildTestToken(adminWebId));
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    it("Can ban someone and banned can't use api", async () => {
        await request(app).post("/admin/blacklist")
            .send({webId: adminWebId})
            .set("Accept", "application/json").set("authorization", buildTestToken(adminWebId));
        const response = await request(app).get("/admin/users");
        expect(response.statusCode).toBe(401);
    });

    it("Shows banned users", async () => {
        await request(app).post("/admin/blacklist")
            .send({webId: carmenWebId})
            .set("Accept", "application/json").set("authorization", buildTestToken(adminWebId));
        const response = await request(app).get("/admin/blacklist").set("authorization", buildTestToken(adminWebId));
        expect(response.statusCode).toBe(200);
        const bannedUser = response.body[0];
        expect(bannedUser.webId).toBe(carmenWebId);
    });

    it("Can unban someone", async () => {
        await request(app).post("/admin/blacklist")
            .send({webId: carmenWebId})
            .set("Accept", "application/json").set("authorization", buildTestToken(adminWebId));
        const response = await request(app).get("/admin/blacklist").set("authorization", buildTestToken(adminWebId));
        expect(response.statusCode).toBe(200);
        const bannedUser = response.body[0];
        expect(bannedUser.webId).toBe(carmenWebId);
        const deleteRequest = await request(app).delete(`/admin/blacklist/${encodeURIComponent(carmenWebId)}`).set("authorization", buildTestToken(adminWebId));
        expect(deleteRequest.statusCode).toBe(204);
        const response2 = await request(app).get("/admin/blacklist").set("authorization", buildTestToken(adminWebId));
        expect(response2.body.length).toBe(0);
    });
});
