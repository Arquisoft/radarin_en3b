import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom/extend-expect";
import API from "../api/API";
import BlockUser from "../components/BlockUser";

test("block user", async () => {
jest.spyOn(API, "postBlacklist").mockImplementation(() => {
    throw new Error();
});

    const result = await BlockUser("123123123");

    expect(result).not.toBeDefined();
});