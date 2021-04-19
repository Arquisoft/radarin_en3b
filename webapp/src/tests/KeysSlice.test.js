import { render } from '@testing-library/react';
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import keysSlice from "../redux/slices/keysSlice";


test("user is not loggued in by default", async () => {


    /*const logout = queryByText("Logout");
    const login = getByRole("button", { name: "Sign In" });

    expect(logout).not.toBeInTheDocument();
    expect(login).toBeInTheDocument();*/
});