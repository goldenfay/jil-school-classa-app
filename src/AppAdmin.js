
import React from "react";
import { useRoutes} from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
// import { ToastContainer, toast } from "react-toastify";

import routes from './router';

import {LayoutProvider} from './Admin/statecontexts/LayoutContext';
import {ManagerStore} from './redux/stores/';

function App() {
  const routing=useRoutes(routes)
  return (
    <LayoutProvider>
    <Provider store={ManagerStore}>
    {/* <ToastContainer > */}

        {routing}
        {/* </ToastContainer> */}
    </Provider>
    </LayoutProvider>



  );
}

export default App;
