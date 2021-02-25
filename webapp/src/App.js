import React from 'react';
import './App.css';
import EmailForm from "./components/EmailForm";
import UserList from "./components/UserList";
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/About';
import Welcome from './components/Welcome';
import { Switch, Route } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';
import { BrowserRouter } from "react-router-dom";
import MainFooter from './components/MainFooter';

class App extends React.Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  refreshUsers(users) {
    this.setState({ users: users });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <MainNavbar />
          </header>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              {this.main()}
            </Route>
          </Switch>
        </div>
        <MainFooter/>
        </BrowserRouter>
    );
  }

  main() {
    return (
      <div className="App-content">
                   <Welcome name="ASW students"/>
        <EmailForm refreshUsers={this.refreshUsers.bind(this)} />
        <UserList users={this.state.users} />
        <a className="App-link"
          href="https://github.com/pglez82/radarin_0"
          target="_blank"
          rel="noopener noreferrer">Source code</a>
      </div>
    );
  }
}

export default App;