import { render } from '@testing-library/react';
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from 'react-router-dom';
import UploadLocation from '../components/UploadLocation';

jest.setTimeout(10000);
jest.mock("../components/locations/PostLocation");

test("location uploading", async () => {
    global.URL.createObjectURL = jest.fn();
    const { getAllByRole, getByTestId } = render(<BrowserRouter><Provider store={store}><UploadLocation /></Provider></BrowserRouter>);

    const logout = getAllByRole("button", { className: "svg_icons_container" });

    expect(logout[1]).toBeInTheDocument();
    fireEvent.click(logout[1]);

    const input = getByTestId("input");
    
    fireEvent.change(input, { value: new Blob() });
});