import React from 'react';
import './App.css';
import EmailForm from "./components/EmailForm";
import UserList from "./components/UserList";
import LoginPage from "./components/LoginPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/About';
import Welcome from './components/Welcome';
import { Switch, Route } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';
import MainFooter from './components/MainFooter';
import ResponsiveDrawer from './components/Localizations';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header>
          <MainNavbar />
        </header>
        <Switch>
          <Route path="/localizations">
            <ResponsiveDrawer />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
          </Route>
        </Switch>
      </div>
      <MainFooter />
    </React.Fragment>
  );
}

// function Main() {
//   const [users, setUsers] = React.useState([]);

//   return (
//     <div className="App-content">
//       <Welcome name="ASW students" />
//       <EmailForm refreshUsers={setUsers()} />
//       <UserList users={users} />
//       <a className="App-link"
//         href="https://github.com/pglez82/radarin_0"
//         target="_blank"
//         rel="noopener noreferrer">Source code</a>
//     </div>
//   );
// }

export default App;