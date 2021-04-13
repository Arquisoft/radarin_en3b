import { render } from '@testing-library/react';
import { fireEvent } from "@testing-library/react";
import App from '../App';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import MainView from '../components/MainView';
import { BrowserRouter } from 'react-router-dom';
import About from '../components/About';

test('user arrives to the home page', async () => {
  const { getByText } = render(<Provider store={store}><App/></Provider>);

  const mainHeader = getByText("Improve your productivity with Radarin");

  expect(mainHeader).toBeInTheDocument();
});

test("user can go to sign in page", async () => {
  const { getAllByRole, getByText } = render(<Provider store={store}><App/></Provider>);

  const about = getAllByRole("link", { name: "About" })[0];

  expect(about).toBeInTheDocument();

  fireEvent.click(about);

  const aboutText = getByText("About Radarin");

  expect(aboutText).toBeInTheDocument();
});

test("main page loads correctly", async() => {
  const { getByText } = render(<BrowserRouter><Provider store={store}><About/></Provider></BrowserRouter>);

  const mainHeader = getByText("About Radarin");

  expect(mainHeader).toBeInTheDocument();
});