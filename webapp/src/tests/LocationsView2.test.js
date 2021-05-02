import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import LocationsList from "../components/LocationsList";
import "@testing-library/jest-dom/extend-expect";
import { SolidNodeClient } from "solid-node-client";

jest.setTimeout(50000);

test("testing location fetching 2", async () => {
    global.URL.createObjectURL = jest.fn();

    const client = new SolidNodeClient({
        handlers: { https: "solid-client-authn-node" }
    });

    let sessionNew = await client.login({
        refreshToken: "dae72e47ab68c32ca86de646b1cad4ba",
        clientId: "97ea8c6eb8c886fbe15b8024de6a94f7",
        clientSecret: "0d7e6545543bbb461c8cd5d4b60a10f9",
        oidcIssuer: "https://solidcommunity.net",
    });

    const { getAllByRole } = render(<Provider store={store}><LocationsList sess={sessionNew}/></Provider>);


    const loading = screen.getAllByText("Loading...")[0];

    expect(loading).toBeInTheDocument();


    // Need to wait for the qr to load, didn't find another way
    await new Promise((res) => setTimeout(() => {
        expect(true).toBe(true);
        res();
        const open = getAllByRole("button", { name: "Open" })[0];

        expect(open).toBeInTheDocument();
    }, 35000));



    sessionNew.logout();
});