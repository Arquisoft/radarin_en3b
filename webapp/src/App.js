import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./components/About";
import { Switch, Route } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import { Router } from "react-router-dom";
import MainFooter from "./components/MainFooter";
import LocationsView from "./components/LocationsView";
import MainView from "./components/MainView";
import LoginPage from "./components/LoginPage";
import QRPage from "./components/QRPage";
import HelpPage from "./components/HelpPage";
import {
  handleIncomingRedirect,
  onSessionRestore
} from "@inrupt/solid-client-authn-browser";
import { useDispatch } from "react-redux";
import { setLogguedStatus } from "./redux/slices/userSlice";
import { createBrowserHistory } from "history";

export default function App() {
  const dispatch = useDispatch();
  const history = createBrowserHistory();

  const routes = (
    <Switch>
      <Route exact path="/">
        <MainView />
      </Route>
      <Route path="/locations">
        <LocationsView />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/login">
        <LoginPage></LoginPage>
      </Route>
      <Route path="/qr">
        <QRPage></QRPage>
      </Route>
      <Route path="/help">
        <HelpPage></HelpPage>
      </Route>
    </Switch>
  )

  onSessionRestore((url) => {
    history.push("/");
  });

  useEffect(() => {
    handleIncomingRedirect({
      restorePreviousSession: true
    }).then(() => {
      dispatch(setLogguedStatus(true));
    });
  }, [dispatch]);

  return (
    <span>
      <Router history={history}>
        <div className="App">
          <header>
            <MainNavbar />
          </header>
          <br /><br /><br /><br />
          {routes}
        </div>
        <MainFooter />
      </Router>
    </span>
  );
}
