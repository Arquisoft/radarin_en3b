import { render } from '@testing-library/react';
import { fireEvent } from "@testing-library/react";
import App from '../App';
import { Provider } from "react-redux";
import store from "../redux/store";

jest.setTimeout(20000);
const redux = require("react-redux");
redux.useSelector = jest.fn();

test('user arrives to the home page', async () => {
  redux.useSelector.mockReturnValueOnce(false);

  const { getByText } = render(<Provider store={store}><App /></Provider>);

  const mainHeader = getByText("The ease and simplicity of Radarin, wherever you are.");

  expect(mainHeader).toBeInTheDocument();
});

test("user can go to sign in page", async () => {
  redux.useSelector.mockReturnValueOnce(false);

  const { getAllByRole, getByText } = render(<Provider store={store}><App /></Provider>);

  const about = getAllByRole("link", { name: "About" })[0];

  expect(about).toBeInTheDocument();

  fireEvent.click(about);

  const aboutText = getByText("About Radarin");

  expect(aboutText).toBeInTheDocument();
});

test("limited version", async () => {
  redux.useSelector.mockReturnValueOnce(true);

  const { getAllByRole } = render(<Provider store={store}><App /></Provider>);

  const logout = getAllByRole("button", { name: "Sign In" });

    expect(logout[0]).toBeInTheDocument();
});