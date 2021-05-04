import "@testing-library/jest-dom/extend-expect";
import removeLocation from "../components/locations/RemoveLocation";

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

test("testing location removal 1", async () => {
    solid.getSolidDataset.mockReturnValue("test");
    solid.saveSolidDatasetAt.mockReturnValueOnce("test");
    solid.getThing.mockReturnValueOnce("test");
    solid.getUrlAll.mockReturnValueOnce("test");
    solid.getSourceUrl.mockReturnValueOnce("test");
    solid.getThingAll.mockReturnValueOnce([1, 2]);
    solid.deleteFile.mockReturnValueOnce("test");
    solid.removeThing.mockReturnValueOnce("test");

    solid.getStringNoLocaleAll.mockImplementation(() => {
        const text = [
            "Title:title",
            "Desc:desc",
            "Photo:adsrfqwer"
        ];
        
        return text;
    });
    

    await removeLocation({ info: { webId: "test" }}, "title", "desc");

    expect(removeLocation).not.toThrow();
});

test("testing location removal 2", async () => {
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
    

    const res = await removeLocation({ info: { webId: "test" }}, "title", "desc");

    expect(res).toStrictEqual([]);
});