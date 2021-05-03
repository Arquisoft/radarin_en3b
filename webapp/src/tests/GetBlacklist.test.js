import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom/extend-expect";
import API from "../api/API";
import GetBlacklist from "../components/GetBlacklist";

test("get users", async () => {
jest.spyOn(API, "getBlacklist").mockImplementation(() => {
    throw new Error();
});

    const result = await GetBlacklist();

    expect(result).toStrictEqual("unauthorized");
});

test("get users 2", async () => {
    jest.spyOn(API, "getBlacklist").mockImplementation(() => {
        return [];
    });
    
        const result = await GetBlacklist();
    
        expect(result).toStrictEqual([]);
    });