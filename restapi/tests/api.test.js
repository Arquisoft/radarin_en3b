const request = require('supertest');
const server = require('./server-for-tests');

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
afterEach(async () => await server.clearDatabase());

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
describe('locations ', () => {
    /**
     * Test that we can list users without any error.
     */
    // it('can be listed', async () => {
    //     const response = await request(app).get("/api/users/list");
    //     expect(response.statusCode).toBe(200);
    // });

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    const webId = "https://radarin.inrupt.net/profile/card#me";
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
            .send({ webId, coords, timestamp })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webId);
        expect(response.body.coords.latitude).toBe(coords.latitude);
        expect(response.body.timestamp).toBe(timestamp);
    });
    it('can be listed', async () => {
        const response = await request(app).get(`/api/locations?webId=${encodeURIComponent(webId)}`);
        expect(response.statusCode).toBe(200);
    });
});