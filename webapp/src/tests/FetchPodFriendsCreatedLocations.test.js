import "@testing-library/jest-dom/extend-expect";
import FetchPodFriendsCreatedLocations from "../components/locations/FetchPodFriendsCreatedLocations";

const solid = require("@inrupt/solid-client");
solid.getSolidDataset = jest.fn();
solid.getThing = jest.fn();
solid.getUrlAll = jest.fn();
solid.saveSolidDatasetAt = jest.fn();
solid.getStringNoLocaleAll = jest.fn();
solid.getThingAll = jest.fn();
solid.deleteFile = jest.fn();
solid.getSourceUrl = jest.fn();
solid.removeThing = jest.fn();
FetchPodFriendsCreatedLocations.isMutual = jest.fn();

test("testing location removal 2", async () => {
    

    solid.saveSolidDatasetAt.mockReturnValue("test");
    solid.getThing.mockReturnValue("test");
    solid.getUrlAll.mockReturnValue(["test"]);
    FetchPodFriendsCreatedLocations.isMutual.mockReturnValue(true);

    let counter = 0;
    let error;
    solid.getSolidDataset.mockImplementation(() => {
        counter++;

        if(counter !== 4) {
            return "test";
        } else {
            error = new Error("test");
            error.statusCode = 404;
            throw error;
        }
    });
    
    const res = await FetchPodFriendsCreatedLocations({ info: { webId: "test" }}, 0);

    expect(res).toStrictEqual([]);
});