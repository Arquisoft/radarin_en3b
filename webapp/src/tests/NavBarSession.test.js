import { render } from '@testing-library/react';
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from 'react-router-dom';
import NavbarSession from '../components/NavbarSession';

jest.setTimeout(10000);

test("user is not loggued in by default", async () => {
    const { getAllByRole } = render(<BrowserRouter><Provider store={store}><NavbarSession /></Provider></BrowserRouter>);

    const logout = getAllByRole("button", { name: "Log out" });

    //console.log(logout);

    expect(logout[0]).toBeInTheDocument();

    fireEvent.click(logout[0]);

    await new Promise(res => setTimeout(() => {
        expect(true).toBe(true);
        res();
    }, 3000));
});