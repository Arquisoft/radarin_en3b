import { fireEvent, render, screen } from "@testing-library/react";
import Polyline from "../components/locations/Polyline";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";

test("Locations work", async () => {
    const key = 1;
    const childKey = 2;
    const name = "Polyline test";
    const details = "this is a test Polyline";
    const coords = [50, -4];

    const { getAllByRole } = render(<Provider store={store}><Polyline key={key} childKey={childKey} name={name} details={details} coords={coords}/></Provider>);

    const text = screen.getAllByText("Polyline test")[0];

    expect(text).toBeInTheDocument();

    const button = getAllByRole("button")[0];

    fireEvent.click(button);
});