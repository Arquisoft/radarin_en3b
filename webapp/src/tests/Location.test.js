import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Location from "../components/locations/Location";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";

jest.mock("../components/locations/RemoveLocation");

test('Locations work', async () => {
    const key = 1;
    const childKey = 2;
    const name = "location test";
    const details = "this is a test location";
    const coords = [50, -4];
    const webId = "test";
    const session = { info: { webId: "test" }};

    const { getByRole } = render(<Provider store={store}><Location key={key} childKey={childKey} title={name} description={details} coords={coords} sess={session} webId={webId}/></Provider>);

    const button = getByRole("button", {name: "Open" });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const remove = getByRole("button", { name: "Remove" });
    expect(remove).toBeInTheDocument();

    fireEvent.click(remove);
    const remove2 = getByRole("button", { name: "Remove" });
    expect(remove2).toBeInTheDocument();
    fireEvent.click(remove2);

    const button2 = getByRole("button", { name: "Close" });

    expect(button2).toBeInTheDocument();
    fireEvent.click(button2);
});

test('Locations work', async () => {
    const key = 1;
    const childKey = 2;
    const name = "location test";
    const details = "this is a test location";
    const coords = [50, -4];
    const webId = "test";
    const session = { info: { webId: "test" }};

    const { getByRole } = render(<Provider store={store}><Location key={key} childKey={childKey} title={name} description={details} coords={coords} sess={session} webId={webId}/></Provider>);

    const button = getByRole("button", {name: "Open" });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const button2 = getByRole("button", { name: "Close" });

    expect(button2).toBeInTheDocument();
    fireEvent.click(button2);
});