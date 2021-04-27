const request = require('supertest');
const server = require('./server-for-tests');
const friendsStore = require("../middleware/FriendsStore");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await server.startdb();
    app = await server.startserver();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    await server.clearDatabase();
    //Clear cache
    friendsStore._cache = friendsStore._cache.empty();
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
    const friend = "https://carmen279.inrupt.net/profile/card#me";
    const nonAdded = "https://efecto2k.solidcommunity.net/profile/card#me";
    const addedByRadarinButNotByHim = "https://efecto2k.inrupt.net/profile/card#me";
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
    it('can be created correctly', async () => {
        const response = await request(app).post('/api/locations')
            .send({ webId: radarin, coords, timestamp })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(radarin);
        expect(response.body.coords.latitude).toBe(coords.latitude);
        expect(response.body.timestamp).toBe(timestamp);
    });
    it('can be listed', async () => {
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
});

describe('Locations security testing', () => {
    const friend = "https://carmen279.inrupt.net/profile/card#me";
    const nonAdded = "https://efecto2k.solidcommunity.net/profile/card#me";
    const addedByRadarinButNotByHim = "https://efecto2k.inrupt.net/profile/card#me";
    it("can get friend locations", async () => {
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(friend)}`);
        expect(response.statusCode).toBe(200);
    });
    it("can't get non-added by radarin people locations", async () => {
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(nonAdded)}`);
        expect(response.statusCode).toBe(403);
    });
    it("can't get added by radarin but not by them people locations", async () => {
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(addedByRadarinButNotByHim)}`);
        expect(response.statusCode).toBe(403);
    });
});