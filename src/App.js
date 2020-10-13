import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Auth from "./Admin/auth/pages/Auth";
import Dashboard from "./Admin/dashboard/pages/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact  component={Auth} />
        <Route path="/dashboard" exact  component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
