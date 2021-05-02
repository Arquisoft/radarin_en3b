import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import LocationsList from "../components/LocationsList";
import "@testing-library/jest-dom/extend-expect";

jest.setTimeout(20000);

const redux = require("react-redux");
redux.useSelector = jest.fn();

test("testing search bar", async () => {
    let counter = 1;
    redux.useSelector.mockImplementation(() => {
        if(counter++ === 5)
        {return [];}
        return "succeeded";
    });

    const { getAllByRole } = render(<Provider store={store}><LocationsList/></Provider>);


    const searchBar2 = getAllByRole("textbox");


    fireEvent.focus(searchBar2[0]);
    fireEvent.change(searchBar2[0], { target: { value: "a" }});

    expect(searchBar2[0]).toBeInTheDocument();
});