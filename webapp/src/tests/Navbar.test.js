import { render } from '@testing-library/react';
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';


test("user is not loggued in by default", async () => {
    const { queryByText, getByRole } = render(<BrowserRouter><Provider store={store}><MainNavbar/></Provider></BrowserRouter>);
  
    const logout = queryByText("Logout");
    const login = getByRole("button", { name: "Sign In" });
  
    expect(logout).not.toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });
  
  test("user can go to sign in page", async () => {
    const { getByRole } = render(<BrowserRouter><Provider store={store}><MainNavbar/></Provider></BrowserRouter>);
  
    const login = getByRole("button", { name: "Sign In" });
  
    expect(login).toBeInTheDocument();
  
    fireEvent.click(login);
  
    //const loginText = getByRole("link", { name: "Inrupt" });
  
    //expect(loginText).toBeInTheDocument();
  });