import { render } from '@testing-library/react';
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import App from '../App';


test("user is not loggued in by default", async () => {
    const { queryByText, getByRole } = render(<BrowserRouter><Provider store={store}><MainNavbar /></Provider></BrowserRouter>);

    const logout = queryByText("Logout");
    const login = getByRole("button", { name: "Sign In" });

    expect(logout).not.toBeInTheDocument();
    expect(login).toBeInTheDocument();
});

test("user can go to sign in page", async () => {
    const { getByRole } = render(<Provider store={store}><App /></Provider>);

    const login = getByRole("button", { name: "Sign In" });

    expect(login).toBeInTheDocument();

    fireEvent.click(login);

    const loginText = getByRole("link", { name: "Inrupt" });

    expect(loginText).toBeInTheDocument();
});

test("user can go to about page", async () => {
    const { getByText, getAllByRole } = render(<Provider store={store}><App /></Provider>);

    const link = getAllByRole("link", { name: "About" })[0];

    expect(link).toBeInTheDocument();

    fireEvent.click(link);

    const mainHeader = getByText("About Radarin");

    expect(mainHeader).toBeInTheDocument();
});

test("user can go to main page", async () => {
    const { getByText, getAllByRole } = render(<Provider store={store}><App /></Provider>);

    const link = getAllByRole("link", { name: "Home" })[0];

    expect(link).toBeInTheDocument();

    fireEvent.click(link);

    const mainHeader = getByText("Improve your productivity with Radarin");

    expect(mainHeader).toBeInTheDocument();
});