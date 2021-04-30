const request = require('supertest');
const server = require('./server-for-tests');
const friendsStore = require("../middleware/FriendsStore");
const Admin = require("../models/Admin");
const adminWebId = "https://radarin.inrupt.net/profile/card#me";

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await server.startdb();
    app = await server.startserver();
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
describe('Locations saving and fetching', () => {

    const radarin = "https://radarin.inrupt.net/profile/card#me";
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
    it('Can be created correctly', async () => {
        const response = await request(app).post('/api/locations')
            .send({ webId: radarin, coords, timestamp })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(radarin);
        expect(response.body.coords.latitude).toBe(coords.latitude);
        expect(response.body.timestamp).toBe(timestamp);
    });
    it('Can be listed', async () => {
        await request(app).post('/api/locations')
            .send({ webId: radarin, coords, timestamp })
            .set('Accept', 'application/json');
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(radarin)}`);
        const last = response.body[response.body.length - 1];
        expect(last.webId).toBe(radarin);
        expect(last.coords.latitude).toBe(coords.latitude);
        expect(last.timestamp).toBe(timestamp);
        expect(response.statusCode).toBe(200);
    });
    it('Throws an error when not passing query parameter', async () => {
        await request(app).get('/api/locations')
            .send({ webId: radarin, coords, timestamp })
            .set('Accept', 'application/json');
        const response = await request(app).get("/api/locations");
        expect(response.statusCode).toBe(400);
    });
    it("Gets ONLY a single (the last) location", async () => {
        await request(app).post('/api/locations')
            .send({ webId: radarin, coords, timestamp })
            .set('Accept', 'application/json');
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(radarin)}&last=true`);
        const last = response.body;
        expect(last.webId).toBe(radarin);
        expect(last.coords.latitude).toBe(coords.latitude);
        expect(last.timestamp).toBe(timestamp);
        expect(response.statusCode).toBe(200);
    });
});

describe('Locations security testing', () => {

    const friend = "https://carmen279.inrupt.net/profile/card#me";
    const nonAdded = "https://efecto2k.solidcommunity.net/profile/card#me";
    const addedByRadarinButNotByHim = "https://efecto2k.inrupt.net/profile/card#me";
    it("Can get friend locations", async () => {
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(friend)}`);
        expect(response.statusCode).toBe(200);
    });
    it("Can't get non-added by radarin people locations", async () => {
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(nonAdded)}`);
        expect(response.statusCode).toBe(403);
    });
    it("Can't get added by radarin but not by them people locations", async () => {
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(addedByRadarinButNotByHim)}`);
        expect(response.statusCode).toBe(403);
    });
});

describe('FriendsStore specific testing', () => {

    const radarin = "https://radarin.inrupt.net/profile/card#me";
    const friend = "https://carmen279.inrupt.net/profile/card#me";

    it("Works when cache is hit for radarin webId", async () => {
        //load radarin friends into cache
        const radarinFriends = await friendsStore.fetchFriends(radarin);
        friendsStore._cache.set(radarin, radarinFriends);

        //Test if the request goes well when cache is hit
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(friend)}`);
        expect(response.statusCode).toBe(200);
    });

    it("Works when cache is hit for radarin friend but not for radarin", async () => {
        //load radarin friends into cache
        const friendFriends = await friendsStore.fetchFriends(friend);
        friendsStore._cache.set(friend, friendFriends);

        //Test if the request goes well when cache is hit
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(friend)}`);
        expect(response.statusCode).toBe(200);
    });
});


describe('Admin endpoints testing', () => {

    const radarin = "https://radarin.inrupt.net/profile/card#me";
    const carmen = "https://carmen279.inrupt.net/profile/card#me";

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
        const x = await request(app).post('/api/locations')
            .send({ webId: radarin, coords, timestamp })
            .set('Accept', 'application/json');
        const response = await request(app).get(`/admin/users`);
        expect(response.statusCode).toBe(200);
    });

    it("Can get list of users if empty", async () => {
        const response = await request(app).get(`/admin/users`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    it("Can ban someone and banned can't use api", async () => {
        const x = await request(app).post('/admin/blacklist')
            .send({ webId: adminWebId })
            .set('Accept', 'application/json');
        const response = await request(app).get(`/admin/users`);
        expect(response.statusCode).toBe(401);
    });

    it("Shows banned users", async () => {
        const x = await request(app).post('/admin/blacklist')
            .send({ webId: carmen })
            .set('Accept', 'application/json');
        const response = await request(app).get(`/admin/blacklist`);
        expect(response.statusCode).toBe(200);
        const bannedUser = response.body[0];
        expect(bannedUser.webId).toBe(carmen);
    });

    it("Can unban someone", async () => {
        const x = await request(app).post('/admin/blacklist')
            .send({ webId: carmen })
            .set('Accept', 'application/json');
        const response = await request(app).get(`/admin/blacklist`);
        expect(response.statusCode).toBe(200);
        const bannedUser = response.body[0];
        expect(bannedUser.webId).toBe(carmen);
        const deleteRequest = await request(app).delete(`/admin/blacklist/${encodeURIComponent(carmen)}`);
        expect(deleteRequest.statusCode).toBe(204);
        const response2 = await request(app).get(`/admin/blacklist`);
        expect(response2.body.length).toBe(0);
    });
});
