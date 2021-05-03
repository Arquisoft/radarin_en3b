import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import UploadLocation from "../components/UploadLocation";

jest.setTimeout(10000);
jest.mock("../components/locations/PostLocation");
const redux = require("react-redux");
redux.useSelector = jest.fn();


test("location uploading", async () => {
    global.URL.createObjectURL = jest.fn();

    let counter = 1;
    redux.useSelector.mockImplementation(() => {
        if(counter++ % 2 !== 0)
        {return "?title=hola&comment=prueba&lat=80&long=-4";}
        else
        {return "true";}
    });

    const { getAllByRole } = render(<BrowserRouter><Provider store={store}><UploadLocation /></Provider></BrowserRouter>);

    const logout = getAllByRole("button", { className: "svg_icons_container" });

    expect(logout[1]).toBeInTheDocument();
    fireEvent.click(logout[1]);
});

test("location uploading", async () => {
    global.URL.createObjectURL = jest.fn();

        let counter = 1;
        redux.useSelector.mockImplementation(() => {
            if(counter++ === 1)
                return "undefined";
            else
                return false;
        });

    const { getByText } = render(<BrowserRouter><Provider store={store}><UploadLocation /></Provider></BrowserRouter>);

    const text = getByText("You need to sign in first");

    expect(text).toBeInTheDocument();
});

test("location uploading", async () => {
    global.URL.createObjectURL = jest.fn();

    let counter = 1;
    redux.useSelector.mockImplementation(() => {
        if (counter++ % 2 !== 0)
            return "?title=hola&comment=prueba&lat=80&long=-4";
        else
            return "true";
    });

    const { getByTestId } = render(<BrowserRouter><Provider store={store}><UploadLocation /></Provider></BrowserRouter>);

    const input = getByTestId("input");


    fireEvent.change(input, { value: new Blob() });
});