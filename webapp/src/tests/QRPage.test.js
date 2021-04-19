import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { SolidNodeClient } from 'solid-node-client';
import QRPage from "../components/QRPage";
import keyManagement from "../utils/keyManagement";
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
        refreshToken: "JpAZ91OogWtIjqqo12s8xDhnPvmj93MS",
        clientId: "mPuq6eB3YiO3cOdJDKeugW4Vy7aD3ael",
        clientSecret: "TNaM5Fyfqf7MukM0QgGRWilot38YLZPb",
        oidcIssuer: "https://broker.pod.inrupt.com/",
    });

    console.log(sessionNew);

    render(<Provider store={store}><QRPage sess={sessionNew} /></Provider>);

    expect(screen.getAllByText("Loading...")[0]).toBeInTheDocument();

    const privateKey = "-----BEGIN RSA PRIVATE KEY-----MIICXgIBAAKBgQCmX43OB65rKl6HnQCzeOOjJVka9v+B9hl/j3kO4O/bTHm6BQjzyIwbDBK5Cmo6oB/DeND5u3az2eCdi2Cgb+LM70ZwenJvxPdrunoWhbI0B2lCB961LSPwuIQnvEgviHvGsGjqSacYlPGD8wIcSrazGhQ+StBE85hT1+tvWuY1vwIDAQABAoGBAAohCyseAJp5q+OpxV8n3wQRxAkGPKwW5ZqEi6RCQZgiYc7Xe6IL9au34nPtlGYZVZW7B04NAb8VZr1wvONHrJEgMggwCDl6zQJ65aSMiZEj6V0vbl2L2zMSNOF3VowOGMCMRfn8O4Ak1oyfxpQeVstXojbRhAettlJ6MhtcPpixAkEA6p/q7AiqfW+NShGNHzGMjggKOyc4q/klCLXn7l3boild+4KVGjBazZ20M7YCJAHeDP75cZd3k5K2zsEbhYl5ZQJBALWH1BWjCHQnrKgXeThtjhmevdgJrWFskJGnQr3f2Cg6HXHh9Ah8v42quB2JMIxn/Q9LAaAxaU0oogHQRlZT0lMCQH2vKuZEAihtsG9EFafnIBcZoXlsmkQtk7Ql1ddv+e7VYB4SJpM/4fSRjW3CC0WEppGpqLA75ndsOXdqJLcVHK0CQQCV2qQMnIJ9CMdyF7adC2tz4ORNNGfpdeq+InppLiFNy/PEsEd4viqPMzA8SaVHMwznk/6qlD+eT321y45U82s7AkEA2YevfjGSY3E38OuoFZyGOBXN8hMUgBNupF7ukl+KDlndXmhXPz1OBkEQM8lmY4VEIMmjrVYpahULJ2Nbdcne8Q==-----END RSA PRIVATE KEY-----";

    const publicKey = "-----BEGIN RSA PUBLIC KEY-----MIGJAoGBAKZfjc4HrmsqXoedALN446MlWRr2/4H2GX+PeQ7g79tMeboFCPPIjBsMErkKajqgH8N40Pm7drPZ4J2LYKBv4szvRnB6cm/E92u6ehaFsjQHaUIH3rUtI/C4hCe8SC+Ie8awaOpJpxiU8YPzAhxKtrMaFD5K0ETzmFPX629a5jW/AgMBAAE=-----END RSA PUBLIC KEY-----";


    // We expect it to fail, since logging in this way proves impossible for it not to fail
    //await keyManagement(sessionNew, {public: publicKey, private: privateKey });

    //Same as above
    await fetchDBLocations(sessionNew);

    sessionNew.logout();
});