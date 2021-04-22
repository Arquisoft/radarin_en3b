import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { SolidNodeClient } from 'solid-node-client';
import QRPage from "../components/QRPage";
import fetchDBLocations from "../components/locations/FetchDBLocations";


jest.setTimeout(20000);

/*
    This method has too many responsibilities, but since creating a session with solid-node-client only works once, didn't have an alternative
    until I find a fix, which doesn't look to be happening soon
*/
test("testing qr page, key management and location fetching", async () => {
    const client = new SolidNodeClient({
        handlers: { https: 'solid-client-authn-node' }
    });

    let sessionNew = await client.login({
        refreshToken: "n63lIBtr9fcHJBWKfdNSQAFHoM2gFoB6",
        clientId: "TBDhEMdmDOzD1Pmjp3NgEIbge7gJBScG",
        clientSecret: "o3MaNUWaiom38MHtpM7ZEj1bvAmd9n9e",
        oidcIssuer: "https://broker.pod.inrupt.com/",
    });

    const data = await fetchDBLocations(sessionNew);

    expect(data).not.toBeNull();

    const { findByText } = render(<Provider store={store}><QRPage sess={sessionNew} /></Provider>);


    const loading = screen.getAllByText("Loading...")[0];

    expect(loading).toBeInTheDocument();


    // Need to wait for the qr to load, didn't find another way
    await new Promise(res => setTimeout(() => {
        expect(true).toBe(true);
        res();
    }, 5000));

    sessionNew.logout();
});