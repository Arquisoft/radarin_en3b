import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom/extend-expect";
import API from "../api/API";
import UnblockUser from "../components/UnblockUser";

test("get users", async () => {
jest.spyOn(API, "deleteBlacklist").mockImplementation(() => {
    throw new Error();
});

    const result = await UnblockUser("123123");

    expect(result).not.toBeDefined();
});
