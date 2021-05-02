import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import LocationsListMock from "../components/LocationsListMock";
import "@testing-library/jest-dom/extend-expect";

jest.setTimeout(20000);

const redux = require("react-redux");
redux.useSelector = jest.fn();

test("testing search bar", async () => {
    let counter = 0;
    redux.useSelector.mockImplementation(() => {
        counter += 1;
        if(counter === 3)
        {return [{ key: 2, childKey: 3, name: "test", details: "a test", coords: [0,0]}];}
        else if(counter === 4)
        {return "";}
        return "succeeded";
    });

    const { getAllByRole } = render(<Provider store={store}><LocationsListMock/></Provider>);

    const searchBar2 = getAllByRole("textbox");


    fireEvent.focus(searchBar2[0]);
    fireEvent.change(searchBar2[0], { target: { value: "a" }});

    expect(searchBar2[0]).toBeInTheDocument();
});