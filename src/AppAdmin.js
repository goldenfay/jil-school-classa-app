
import React from "react";
import { Provider } from "react-redux";
import "./App.css";

import Routes from './router';

import {LayoutProvider} from './Admin/statecontexts/LayoutContext';
// import {ManagerStore} from './redux/stores/';
import {AdminStore} from './redux/stores/';
// import {configureFakeBackend} from './fake/fakeBackend'
function App() {
  // configureFakeBackend();

  return (
    <LayoutProvider>
    <Provider store={AdminStore}>
    <Routes/>
    </Provider>
    </LayoutProvider>



  );
}

export default App;
