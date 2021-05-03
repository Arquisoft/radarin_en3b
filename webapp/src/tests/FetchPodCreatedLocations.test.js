import "@testing-library/jest-dom/extend-expect";
import FetchPodCreatedLocations from "../components/locations/FetchPodCreatedLocations";

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
        {return "test";}

        const error = new Error("test");
        error.statusCode = 404;
        throw error;
    });

    solid.saveSolidDatasetAt.mockReturnValueOnce("test");

    solid.getThing.mockReturnValueOnce("test");

    solid.getUrlAll.mockReturnValueOnce("test");


    const result = await FetchPodCreatedLocations({ info: { webId: "test" }}, null);

    expect(result).toStrictEqual([]);
});