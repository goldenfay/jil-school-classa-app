// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Auth from "./Admin/auth/pages/Auth";
// import Dashboard from "./Admin/dashboard/pages/Dashboard";

// const renderer =(props,view)=><Dashboard {...props} view={view}/>
// export default function router() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact component={Auth} />
//         <Route path="/dashboard" exact render={(props)=>renderer(props,'/') }/>
//         <Route path="/enseignants" exact render={(props)=>renderer(props,'enseignants') } />
//       </Switch>
//     </Router>
//   );
// }

import React from 'react';

// View
import Auth from "./Admin/auth/pages/Auth";
import DashboardLayout from './Admin/dashboard/pages/Dashboard';
import Enseignants from './Admin/dashboard/pages/enseignants/Enseignants';
import Abonnes from './Admin/dashboard/pages/Abonnes';
import Eleves from './Admin/dashboard/pages/Eleves';
import Profile from './Admin/dashboard/pages/Profile';
import Pubs from './Admin/dashboard/pages/Pubs';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'enseignants', element: <Enseignants /> },
      { path: 'abonnes', element: <Abonnes /> },
      { path: 'eleves', element: <Eleves /> },
      { path: 'profile', element: <Profile /> },
      { path: 'pubs', element: <Pubs /> },
      // { path: 'settings', element: <SettingsView /> },
      // { path: '*', element: <Route to="/404" /> }
    ]
  },
  
];

export default routes;
