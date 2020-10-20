import React from "react";
import { BrowserRouter as  Router } from "react-router-dom";
import "./App.css";
import AppAdmin from './AppAdmin';

function App() {
  return (
    <Router>
      <AppAdmin/>
    </Router>
  );
}

export default App;
