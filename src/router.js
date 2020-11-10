import React from "react";
import { Route, BrowserRouter as Router, Routes,Navigate } from "react-router-dom";

// View
import Auth from "./Admin/auth/pages/Auth";
import Logout from "./Admin/auth/pages/Logout";
import ManagerDashboardLayout from "./Admin/Manager/dashboard/pages/DashboardLayout";
import TeacherDashboardLayout from "./Admin/Teacher/dashboard/pages/Dashboard";
// Manager's views
import Dashboard from "./Admin/Manager/dashboard/pages/dashboard/Dashboard";
import Enseignants from "./Admin/Manager/dashboard/pages/enseignants/Enseignants";
import Abonnes from "./Admin/Manager/dashboard/pages/Abonnes";
import Eleves from "./Admin/Manager/dashboard/pages/Eleves";
import Profile from "./Admin/Manager/dashboard/pages/Profile";
import Pubs from "./Admin/Manager/dashboard/pages/Pubs";

// Teacher's views
import Contenu from "./Admin/Teacher/dashboard/pages/contenu/Contenu";
import ElevesClasse from "./Admin/Teacher/dashboard/pages/Eleves";
import TeacherProfile from "./Admin/Teacher/dashboard/pages/Profile";

 
// Redux
import { connect } from "react-redux";

const isLoggedIn = (adminType) => {
  const admin = localStorage.getItem(
    adminType === "manager" ? "manager" : "enseignant"
  );
  return admin !== null;
};



function PrivateRoute({ component: Component, adminType,from,...rest }) {

  return (
    // <Provider store={from==="/"?ManagerStore:TeacherStore} >
    <Route
      {...rest}
      element={((props) =>
        isLoggedIn(adminType) ? (
          <Component {...props} />
        ) : (
          <Navigate
          
            to={{ pathname: "/login", state: { from: from } }}
          />
        )
      )()
      }
    />
    // </Provider>
  );
}

// const routes = [
//   {
//     path: '/login',
//     element: <Auth />,
//   },
//   {
//     path: '/',
//     element: privateRoute('manager',ManagerDashboardLayout),
//     children: [
//       { path: 'enseignants', element: privateRoute('manager',Enseignants) },
//       { path: 'abonnes', element: privateRoute('manager',Abonnes) },
//       { path: 'eleves', element: privateRoute('manager',Eleves) },
//       { path: 'profile', element: privateRoute('manager',Profile) },
//       { path: 'pubs', element:privateRoute('manager',Pubs) },
//       // { path: 'settings', element: <SettingsView /> },
//       // { path: '*', element: <Route to="/404" /> }
//     ]
//   },
//   {
//     path: '/teacher',
//     element: <Provider store={TeacherStore}><TeacherDashboardLayout /></Provider>,
//     children: [
//       { path: 'contenu', element: <Contenu /> },
//       { path: 'eleves', element: <ElevesClasse /> },
//       { path: 'profile', element: <TeacherProfile /> },
//       // { path: 'settings', element: <SettingsView /> },
//       // { path: '*', element: <Route to="/404" /> }
//     ]
//   },

// ];

function router(props) {

  return (
    <Router>
    <Routes>
    
      <Route path='/login' element={<Auth /> } />
      <Route path='/logout' element={<Logout /> } />
      {props.currentAdminType==="manager" && (<Route path="/"   element={<PrivateRoute component={ManagerDashboardLayout} adminType='manager' from='/' path='/'/>}>
       
        <Route path="" element={<Dashboard />} />
        <Route path="enseignants" element={<Enseignants />} />
        <Route path="cyclesannes" element={<Dashboard />} />
        <Route path="abonnes" element={<Abonnes />} />
        <Route path="eleves" element={<Eleves/>} />
        <Route path="profile" element={<Profile/>} />
        <Route path="pubs" element={<Pubs/>} />
      </Route>)} 
      {props.currentAdminType==="enseignant" &&(<Route path="/teacher"   element={<PrivateRoute component={TeacherDashboardLayout} adminType='enseignant' from='/teacher' path='/teacher'/>}>
       
        <Route path="contenu" element={<Contenu />} />
        <Route path="eleves" element={<ElevesClasse/>} />
        <Route path="profile" element={<TeacherProfile/>} />
      </Route> )}
      {/* <Route path="*" element={<Navigate
          
            to={{ pathname: "/login"}}
          />}
      /> */}
    </Routes>
  </Router>
  )
}

router.propTypes = {

}

const mapStateToProps = (state) => { return ({
  currentAdminType: state.adminReducer.adminType,
})};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(router);


