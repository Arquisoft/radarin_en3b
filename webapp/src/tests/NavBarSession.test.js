import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import NavbarSession from "../components/NavbarSession";

jest.setTimeout(10000);

test("user is not loggued in by default", async () => {

    const webId = "https://radarin.inrupt.net/profile/card#me";

    const { getAllByRole } = render(<BrowserRouter><Provider store={store}><NavbarSession webId={webId}/></Provider></BrowserRouter>);

    const logout = getAllByRole("button", { name: "Log out" });

    expect(logout[0]).toBeInTheDocument();
    fireEvent.click(logout[0]);

    expect(logout[1]).toBeInTheDocument();
    fireEvent.click(logout[1]);

    await new Promise((res) => setTimeout(() => {
        expect(true).toBe(true);
        res();
    }, 3000));
});