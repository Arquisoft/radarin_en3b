import "@testing-library/jest-dom/extend-expect";
import fetchDBLocations from "../components/locations/FetchDBLocations";
import API from "../api/API";

const solid = require("@inrupt/solid-client");
solid.getSolidDataset = jest.fn();
solid.getThing = jest.fn();
solid.getUrlAll = jest.fn();
solid.saveSolidDatasetAt = jest.fn();
solid.getStringNoLocale = jest.fn();

test("testing location fetching 2", async () => {
    let counter = 0;
    solid.getSolidDataset.mockImplementation(() => {
        counter++;

        if(counter === 1)
            return "test";

        const error = new Error("test");
        error.statusCode = 404;
        throw error;
    });

    solid.saveSolidDatasetAt.mockReturnValueOnce("test");

    solid.getThing.mockReturnValueOnce("test");

    solid.getUrlAll.mockReturnValueOnce("test");


    const result = await fetchDBLocations({ info: { webId: "test" }});

    expect(result).toStrictEqual([]);
});

test("testing location fetching 3", async () => {
    solid.getSolidDataset.mockImplementation(() => {
            return "test";
    });

    solid.saveSolidDatasetAt.mockReturnValueOnce("test");

    solid.getThing.mockReturnValueOnce("test");

    solid.getUrlAll.mockReturnValueOnce("test");

    solid.getStringNoLocale.mockReturnValueOnce("test");

    const result = await fetchDBLocations({ info: { webId: "test" }});

    expect(result).toStrictEqual([]);
});

test("testing location fetching 4", async () => {
    jest.spyOn(API, "setIdentity").mockReturnValueOnce("test");

    solid.getSolidDataset.mockImplementation(() => {
            return "test";
    });

    solid.saveSolidDatasetAt.mockReturnValueOnce("test");

    solid.getThing.mockReturnValueOnce("test");

    solid.getUrlAll.mockReturnValueOnce("test");

    solid.getStringNoLocale.mockReturnValueOnce("test");

    const result = await fetchDBLocations({ info: { webId: "test" }});

    expect(result).toStrictEqual([]);
});

test("testing location fetching 5", async () => {
    solid.getSolidDataset.mockImplementation(() => {
            return "test";
    });

    solid.saveSolidDatasetAt.mockReturnValueOnce("test");

    solid.getThing.mockReturnValueOnce("test").mockReturnValueOnce(null);

    solid.getUrlAll.mockReturnValueOnce("test");

    solid.getStringNoLocale.mockReturnValueOnce("test");

    const result = await fetchDBLocations({ info: { webId: "test" }});

    expect(result).toStrictEqual([]);
});

test("testing location fetching 5", async () => {
    jest.spyOn(API, "setIdentity").mockReturnValueOnce("test");
    jest.spyOn(API, "getLocations").mockImplementation(() => {
        const locations = [
            {
                coords: {
                    latitude: 0,
                    longitude: 0, 
                },
                timestamp: new Date(87676786)
            },
            {
                coords: {
                    latitude: 0,
                    longitude: 0, 
                },
                timestamp: new Date(80000000)
            }
        ];

        return locations;
    });

    solid.getSolidDataset.mockImplementation(() => {
            return "test";
    });

    solid.saveSolidDatasetAt.mockReturnValueOnce("test");

    solid.getThing.mockReturnValueOnce("test");

    solid.getUrlAll.mockReturnValueOnce("test");

    solid.getStringNoLocale.mockReturnValueOnce("test");

    const result = await fetchDBLocations({ info: { webId: "test" }});

    expect(result).toBeDefined();
});