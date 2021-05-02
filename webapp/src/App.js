import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./components/About";
import { Switch, Route } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import { HashRouter as Router } from "react-router-dom";
import MainFooter from "./components/MainFooter";
import LocationsView from "./components/LocationsView";
import UploadLocation from "./components/UploadLocation";
import MainView from "./components/MainView";
import LoginPage from "./components/LoginPage";
import QRPage from "./components/QRPage";
import HelpPage from "./components/HelpPage";
import {
    handleIncomingRedirect,
    onSessionRestore
} from "@inrupt/solid-client-authn-browser";
import { useDispatch, useSelector } from "react-redux";
import { setLogguedStatus } from "./redux/slices/userSlice";
import { createHashHistory } from "history";

export default function App() {
    const dispatch = useDispatch();
    const history = createHashHistory();
    const limitedVersion = useSelector((state) => state.user.limitedVersion);
    const urlParams = useSelector((state) => state.user.urlParams);

    onSessionRestore((url) => {
    //https://radarinen3bwebapp.herokuapp.com/about
        let uri = url.split("//")[1].split("/");
        history.push(uri[2]);
    });

    useEffect(() => {
        document.title = "Radarin";
        handleIncomingRedirect({
            restorePreviousSession: true
        }).then(() => {
            dispatch(setLogguedStatus(true));
        });
    }, [dispatch]);

    let content;

    if (limitedVersion) {
        content = (
            <div className="App">
                <header>
                    <MainNavbar />
                </header>
                <br /><br /><br /><br /><br />
                <Switch>
                    <Route path="/uploadLocation">
                        <UploadLocation />
                    </Route>
                    <Route path="/login">
                        <LoginPage redirectUrl={urlParams} />
                    </Route>
                </Switch>
            </div>
        );
    } else {
        content = (
            <div>
                <div className="App">
                    <header>
                        <MainNavbar />
                    </header>
                    <br /><br /><br /><br />
                    <Switch>
                        <Route path="/locations">
                            <LocationsView />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/qr">
                            <QRPage />
                        </Route>
                        <Route path="/uploadLocation">
                            <UploadLocation />
                        </Route>
                        <Route path="/help">
                            <HelpPage/>
                        </Route>
                        <Route path="/">
                            <MainView />
                        </Route>
                    </Switch>
                </div>
                <MainFooter />
            </div>
        );
    }


    return (
        <Router history={history}>
            {content}
        </Router>
    );
}
