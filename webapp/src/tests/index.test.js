import React from "react";
import ReactDOM from "react-dom";
import "../index.css";
import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "@inrupt/solid-ui-react";
import store from "../redux/store";
import { Provider } from "react-redux";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        div.id = "root";
        document.body.appendChild(div);
        require("../index.js");
        expect(ReactDOM.render).toHaveBeenCalledWith(<React.StrictMode>
            <SessionProvider sessionId="logged-user">
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </SessionProvider>

        </React.StrictMode >, div);
    });
});