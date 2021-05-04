import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import MapView from "../components/MapView";

const redux = require("react-redux");
redux.useSelector = jest.fn();

test("map renders correctly", async () => {
    let counter = 0;

    redux.useSelector.mockImplementation(() => {
        counter += 1;

        if (counter % 3 === 1)
            return [0, 0];

        if (counter % 3 === 2)
            return "test%test$test//test.net";

        if (counter % 3 === 0)
            return [[0, 0], [0, 1]];
    });

    render(<BrowserRouter><Provider store={store}><MapView /></Provider></BrowserRouter>);


});

test("map renders correctly2", async () => {
    let counter = 0;

    redux.useSelector.mockImplementation(() => {
        counter += 1;

        if (counter % 3 === 1)
            return [0, 0];

        if (counter % 3 === 2)
            return "test$test$test//test.net";

        if (counter % 3 === 0)
            return [];
    });

    render(<BrowserRouter><Provider store={store}><MapView /></Provider></BrowserRouter>);


});
