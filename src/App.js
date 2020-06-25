import React from "react";
import { HashRouter, Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import {AppContextProvider} from "./context/AppContext";
function App() {
  return (
    <AppContextProvider>
      <HashRouter basename="/">
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </AppContextProvider>
  );
}

export default App;
