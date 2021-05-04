import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom/extend-expect";
import API from "../api/API";

global.fetch = jest.fn();
test("get users", async () => {
    const mockedResult = { id: "test" };
    fetch.mockReturnValue(
        Promise.resolve({
            json: () => Promise.resolve(mockedResult)
        }));

    const result = await API.getUsers();

    expect(result).toBe(mockedResult);
});

test("post blaklist", async () => {
    const mockedResult = { id: "test" };
    fetch.mockReturnValue(
        Promise.resolve({
            json: () => Promise.resolve(mockedResult)
        }));

    const result = await API.postBlacklist();

    expect(result).toBeDefined();
});

test("delete blacklist", async () => {
    const mockedResult = { id: "test" };
    fetch.mockReturnValue(
        Promise.resolve({
            json: () => Promise.resolve(mockedResult)
        }));

    const result = await API.deleteBlacklist("qwqweqweqwe");

    expect(result).toBeDefined();
});

test("get blacklist", async () => {
    const mockedResult = { id: "test" };
    fetch.mockReturnValue(
            {status: 401}
        );

    const result = await API.getBlacklist();

    expect(result).toBe("unauthorized");
});

test("get blacklist2", async () => {
    const mockedResult = { id: "test" };
    fetch.mockReturnValue(
        Promise.resolve({
            json: () => Promise.resolve(mockedResult)
        }));

    const result = await API.getBlacklist();

    expect(result).toBeDefined();
});