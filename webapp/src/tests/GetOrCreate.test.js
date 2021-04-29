import "@testing-library/jest-dom/extend-expect";
import getOrCreatePublicFilePod from "../utils/GetOrCreatePublicFilePod";
import getOrCreatePrivateFilePod from "../utils/getOrCreatePrivateFilePod";


const solid = require("@inrupt/solid-client");
solid.getSolidDataset = jest.fn();
solid.saveSolidDatasetAt = jest.fn();

test("testing location fetching 2", async () => {
    solid.getSolidDataset.mockImplementation(() => {
        const error = new Error("test");
        error.statusCode = 404;
        throw error;
    });

    solid.saveSolidDatasetAt.mockImplementation(() => {
        return "test";
    });

    const failPublic = await getOrCreatePublicFilePod("", "", "");
    expect(failPublic).toBeDefined();

    const failPrivate = await getOrCreatePrivateFilePod("", "", "");
    expect(failPrivate).toBeDefined();
});