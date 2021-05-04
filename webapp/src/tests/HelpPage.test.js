import { fireEvent, render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import HelpPage from "../components/HelpPage";
import { Provider } from "react-redux";
import store from "../redux/store";

jest.setTimeout(20000);

const redux = require("react-redux");
redux.useSelector = jest.fn();

test("testing help page", async () => {
    redux.useSelector.mockReturnValueOnce(false).mockReturnValueOnce(false);

    const { getByText } = render(<Provider store={store}><HelpPage/></Provider>);

    const text = getByText("Please log in or create an account to see the help.");

    expect(text).toBeInTheDocument();
});

test("testing help page logged in", async () => {
    redux.useSelector.mockReturnValueOnce(false).mockReturnValueOnce(true);

    const { getAllByRole } = render(<Provider store={store}><HelpPage/></Provider>);

    const button = getAllByRole("button")[0];

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const button2 = getAllByRole("button", { name: "OK" })[0];
    
    expect(button2).toBeInTheDocument();

    fireEvent.click(button2);

    expect(button).toBeInTheDocument();
});

test("testing tour", async () => {
    redux.useSelector.mockReturnValueOnce(false).mockReturnValueOnce(true);

    const { getByTestId } = render(<Provider store={store}><HelpPage/></Provider>);

    const button = getByTestId("tourButton");

    fireEvent.click(button);
});