import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import MapView from "../components/MapView";

const redux = require("react-redux");
redux.useSelector = jest.fn();

test("user can change provider text and click sign in", async () => {
    let counter = 0;

    redux.useSelector.mockImplementation(() => {
        counter += 1;
        if(counter % 2 === 1)
        {return [0,0];}
        else if(counter % 2=== 0)
        {return [[0,0],[0,1]];}
    });

    render(<BrowserRouter><Provider store={store}><MapView/></Provider></BrowserRouter>);


});
