import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import LocationsView from '../components/LocationsView';
import fetchDBLocations from "../components/locations/FetchDBLocations";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../components/locations/FetchDBLocations");

test("testing location fetching", async () => {

    const sessionNew = "https://radarin.inrupt.net/profile/card#me";

    render(<Provider store={store}><LocationsView sess={sessionNew}/></Provider>);

    expect(screen.getAllByText("Loading...")[0]).toBeInTheDocument();

    expect(fetchDBLocations).toHaveBeenCalledTimes(1);
});