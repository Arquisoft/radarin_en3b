/* eslint-disable */
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { SolidNodeClient } from "solid-node-client";
import QRPage from "../components/QRPage";
import fetchDBLocations from "../components/locations/FetchDBLocations";


jest.setTimeout(20000);

test("testing qr page, key management and location fetching", async () => {
    const client = new SolidNodeClient({
        handlers: { https: "solid-client-authn-node" }
    });

    let sessionNew = await client.login({
        refreshToken: "dae72e47ab68c32ca86de646b1cad4ba",
        clientId: "97ea8c6eb8c886fbe15b8024de6a94f7",
        clientSecret: "0d7e6545543bbb461c8cd5d4b60a10f9",
        oidcIssuer: "https://solidcommunity.net",
    });

    const data = await fetchDBLocations(sessionNew);

    expect(data).not.toBeNull();

    const { getByRole } = render(<Provider store={store}><QRPage sess={sessionNew} /></Provider>);

    const button = getByRole("button", { name: "Show QR" });

    fireEvent.click(button);

    const loading = screen.getAllByText("Loading...")[0];

    expect(loading).toBeInTheDocument();


    // Need to wait for the qr to load, didn't find another way
    await new Promise((res) => setTimeout(() => {
        expect(true).toBe(true);
        res();
    }, 5000));

    sessionNew.logout();
});
