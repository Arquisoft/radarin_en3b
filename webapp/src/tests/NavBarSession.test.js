import { render } from '@testing-library/react';
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from 'react-router-dom';
import NavbarSession from '../components/NavbarSession';


test("user is not loggued in by default", async () => {
    const { getAllByRole } = render(<BrowserRouter><Provider store={store}><NavbarSession /></Provider></BrowserRouter>);

    const logout = getAllByRole("button", { name: "Log out" })[1];

    expect(logout).toBeInTheDocument();

    fireEvent.click(logout);

    expect(logout).toBeInTheDocument();
});