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
import {
  handleIncomingRedirect,
  onSessionRestore
} from "@inrupt/solid-client-authn-browser";
import { useDispatch } from "react-redux";
import { setLogguedStatus } from "./redux/slices/userSlice";
import { createBrowserHistory }  from "history";

export default function App() {
  const dispatch = useDispatch();
  const history = createBrowserHistory();

  onSessionRestore((url) => {
    console.log(url);
      history.push(url.split("http://localhost:3000/")[1]);
  });

  useEffect(() => {
      handleIncomingRedirect({
        restorePreviousSession: true
      }).then(() => {
          dispatch(setLogguedStatus(true));
      });
  }, [dispatch]);

  return (
    <Router history={history}>
      <div className="App">
        <header>
          <MainNavbar />
        </header>
        <br /><br /><br /><br /><br /><br />
        <Switch>
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
          <Route path="/">
            <MainView />
          </Route>
        </Switch>
      </div>
      <MainFooter />
    </Router>
  );
}
