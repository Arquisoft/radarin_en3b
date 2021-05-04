import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom/extend-expect";
import API from "../api/API";
import FetchUsersAdmin from "../components/FetchUsersAdmin";

test("get users", async () => {
jest.spyOn(API, "getUsers").mockImplementation(() => {
    throw new Error();
});

    const result = await FetchUsersAdmin("123123123");

    expect(result).toStrictEqual([]);
});

test("get users 2", async () => {
    jest.spyOn(API, "getUsers").mockImplementation(() => {
        return [];
    });
    
        const result = await FetchUsersAdmin("123123123");
    
        expect(result).toStrictEqual([]);
    });