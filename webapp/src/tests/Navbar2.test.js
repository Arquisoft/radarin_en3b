import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';

const solid = require("@inrupt/solid-ui-react");
solid.useSession = jest.fn();

test("navbar dispatchs setlogguedstatus true", async () => {
    solid.useSession.mockImplementation(() => {
        return { session: { info: { isLoggedIn: true }}};
    });

    const { queryByText, getByRole } = render(<BrowserRouter><Provider store={store}><MainNavbar /></Provider></BrowserRouter>);

    const logout = queryByText("Logout");
    const login = getByRole("button", { name: "Toggle navigation" });

    expect(logout).not.toBeInTheDocument();
    expect(login).toBeInTheDocument();
});
