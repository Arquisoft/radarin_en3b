import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import QRPage from "../components/QRPage";

const manageKeys = jest.fn("../redux/slices/keysSlice");

jest.setTimeout(20000);

test("qr page fails", async () => {
    manageKeys.mockImplementation(() => {
        Promise.reject();
    });

    const { queryByText } = render(<Provider store={store}><QRPage /></Provider>);

    // Need to wait for the qr to load, didn't find another way
    await new Promise((res) => setTimeout(() => {
        expect(true).toBe(true);
        res();
    }, 5000));

    const loading = queryByText("Loading...");

    expect(loading).toBe(null);
});

