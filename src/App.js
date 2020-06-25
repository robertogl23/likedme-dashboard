import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import {AppContextProvider} from "./context/AppContext";
function App() {
  return (
    <AppContextProvider>
      <Router>
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
      </Router>
    </AppContextProvider>
  );
}

export default App;
