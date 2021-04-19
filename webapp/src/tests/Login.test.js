import { render, screen } from '@testing-library/react';
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { SolidNodeClient } from 'solid-node-client';
import App from '../App';
import { setLogguedStatus } from '../redux/slices/userSlice';
import LocationsView from '../components/LocationsView';
import fetchDBLocations from "../components/locations/FetchDBLocations";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../components/locations/FetchDBLocations");

/* If this fails you would have to get a new token from Inrupt, as the token expires in 3 days 
   You can get one using https://github.com/inrupt/generate-oidc-token, writing npx @inrupt/generate-oidc-token in the console
*/
test("login with the pod via script", async () => {
    const client = new SolidNodeClient({
        handlers: { https: 'solid-client-authn-node' }
    });
    let sessionNew = await client.login({
        refreshToken: "AyXUpER3mNKPv2AJ8iInnNSsRdPsT3Bw",
        clientId: "52sGm5LPcVbJXMYsLFQGv0J7NAtm5jLE",
        clientSecret: "cblMEXqK3GxhxhT4aVUFcPA1vHUCRSRV",
        oidcIssuer: "https://broker.pod.inrupt.com/",
    });
    console.log(sessionNew);

    const { queryByText, findByRole } = render(<Provider store={store}><LocationsView sess={sessionNew}/></Provider>);

    expect(screen.getAllByText("Loading...")[0]).toBeInTheDocument();

    expect(fetchDBLocations).toHaveBeenCalledTimes(1);

    sessionNew.logout();
});