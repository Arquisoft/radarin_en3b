import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Location from "../components/locations/Location";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";

test("Locations work", async () => {
    const key = 1;
    const childKey = 2;
    const name = "location test";
    const details = "this is a test location";
    const coords = [50, -4];

    const { getByRole } = render(<Provider store={store}><Location key={key} childKey={childKey} name={name} details={details} coords={coords}/></Provider>);

    const button = getByRole("button", {name: "Open" });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const button2 = getByRole("button", { name: "Close" });

    expect(button2).toBeInTheDocument();
    fireEvent.click(button2);
});