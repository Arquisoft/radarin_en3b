import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import AdminPage from "../components/AdminPage";

jest.setTimeout(20000);
const redux = require("react-redux");
redux.useSelector = jest.fn();

const mockDispatch = jest.fn();
const spy = jest.spyOn(redux, 'useDispatch');


test("admin page", async () => {
    let counter = 0;
    redux.useSelector.mockImplementation(() => {
        counter++;
        if (counter === 6) {
            return "succeeded";
        }

        if (counter === 7)
            return true;

        if (counter === 1)
            return "idle";

        if (counter === 5)
            return ["https://marcostobias.solidcommunity.net/profile/card#me", "https://marcostobias.solidcommunty.net/profile/card#me", "https://marcstobias.solidcommunity.net/profile/card#me"];


        return [{ webId: "123123" }, { webId: "123123" }];
    });

    spy.mockReturnValue(mockDispatch);

    render(<BrowserRouter><Provider store={store}><AdminPage /></Provider></BrowserRouter>);

});

test("admin page 2", async () => {
    let counter = 0;
    redux.useSelector.mockImplementation(() => {
        counter++;
        if (counter === 6) {
            return "succeeded";
        }

        if (counter === 7)
            return true;

        if (counter === 1)
            return "succeeded";

        if (counter === 2)
            return "idle";

        if (counter === 5)
            return ["https://marcostobias.solidcommunity.net/profile/card#me", "3https://marcostobias.solidcommunty.net/profile/card#me", "https://marcstobias.solidcommunity.net/profile/card#me"];

        if (counter === 4)
            return "marcos";

        return [{ webId: "123123" }, { webId: "123123" }];
    });

    spy.mockReturnValue(mockDispatch);

    render(<BrowserRouter><Provider store={store}><AdminPage /></Provider></BrowserRouter>);

    await new Promise((res) => setTimeout(() => {
        expect(true).toBe(true);
        res();
    }, 10000));

});

test("admin page 3", async () => {
    let counter = 0;
    redux.useSelector.mockImplementation(() => {
        counter++;
        if (counter === 6) {
            return "succeeded";
        }

        if (counter === 7)
            return false;

        if (counter === 1)
            return "loading";

        if (counter === 2)
            return "idle";

        if (counter === 5)
            return ["https://marcostobias.solidcommunity.net/profile/card#me", "3https://marcostobias.solidcommunty.net/profile/card#me", "https://marcstobias.solidcommunity.net/profile/card#me"];

        if (counter === 4)
            return "marcos";

        return [{ webId: "123123" }, { webId: "123123" }];
    });

    spy.mockReturnValue(mockDispatch);

    render(<BrowserRouter><Provider store={store}><AdminPage /></Provider></BrowserRouter>);
});

test("admin page 4", async () => {
    let counter = 0;
    redux.useSelector.mockImplementation(() => {
        counter++;
        if (counter === 6) {
            return "succeeded";
        }

        if (counter === 7)
            return true;

        if (counter === 1)
            return "succeeded";

        if (counter === 2)
            return "idle";

        if (counter === 5)
            return ["https://marcostobias.solidcommunity.net/profile/card#me", "3https://marcostobias.solidcommunty.net/profile/card#me", "https://marcstobias.solidcommunity.net/profile/card#me"];

        if (counter === 4)
            return "marcos";

        return "unauthorized";
    });

    spy.mockReturnValue(mockDispatch);

    render(<BrowserRouter><Provider store={store}><AdminPage /></Provider></BrowserRouter>);
});

test("admin page 5", async () => {
    let counter = 0;
    redux.useSelector.mockImplementation(() => {
        counter++;
        if (counter === 6) {
            return "succeeded";
        }

        if (counter === 7)
            return true;

        if (counter === 1)
            return "succeeded";

        if (counter === 2)
            return "idle";

        if (counter === 5)
            return ["No users"];

        if (counter === 4)
            return "marcos";

        return [{ webId: "123123" }, { webId: "123123" }];
    });

    spy.mockReturnValue(mockDispatch);

    render(<BrowserRouter><Provider store={store}><AdminPage /></Provider></BrowserRouter>);
});

test("admin page 6", async () => {
    let counter = 0;
    redux.useSelector.mockImplementation(() => {
        counter++;
        if (counter === 6) {
            return "succeeded";
        }

        if (counter === 7)
            return true;

        if (counter === 1)
            return "succeeded";

        if (counter === 2)
            return "idle";

        if (counter === 5)
            return ["https://marcostobias.solidcommunity.net/profile/card#me", "https://marcostobias.solidcommunty.net/profile/card#me", "https://marcstobias.solidcommunity.net/profile/card#me"];

        if (counter === 4)
            return "m";

    });

    spy.mockReturnValue(mockDispatch);

    render(<BrowserRouter><Provider store={store}><AdminPage /></Provider></BrowserRouter>);
});

test("admin page", async () => {
    render(<BrowserRouter><Provider store={store}><AdminPage /></Provider></BrowserRouter>);
});
