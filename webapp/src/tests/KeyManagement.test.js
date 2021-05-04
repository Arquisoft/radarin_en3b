import "@testing-library/jest-dom/extend-expect";
import keyManagement from "../utils/keyManagement";

const solid = require("@inrupt/solid-client");
solid.getSolidDataset = jest.fn();
solid.getThing = jest.fn();
solid.getUrlAll = jest.fn();
solid.saveSolidDatasetAt = jest.fn();

test("testing location removal 2", async () => {
    solid.getThing.mockReturnValue("test");
    solid.getUrlAll.mockReturnValue(["test"]);
    solid.saveSolidDatasetAt.mockReturnValue("test");

    let counter = 0;
    let error;
    solid.getSolidDataset.mockImplementation(() => {
        counter++;

        if(counter < 2) {
            return "test";
        } else {
            error = new Error("test");
            error.statusCode = 404;
            throw error;
        }
    });
    
    const res = await keyManagement({ info: { webId: "test" }}, 0);

    expect(res).not.toBeDefined();
});