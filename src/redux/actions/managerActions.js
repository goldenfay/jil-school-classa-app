import ManagerService from "../../services/managerServices";

const login = (formData) => {
  const { username, password, adminType } = formData;
  return ManagerService.login(username, password, adminType).then(
    (admin) => {

      return { type:adminType==="manager"? "SET_CURRENT_MANAGER":"SET_CURRENT_TEACHER", payload: admin };
    },
    (err) => {
        console.error("Une errur s'est produite lors de la connexion : ",err);
        return {type: "MANAGER_LOGIN_FAILED", payload: err};
    }
  );
};
const logout = () => {
  localStorage.removeItem('manager');
  localStorage.removeItem('token');
  localStorage.removeItem('enseignant');
  return { type: "LOGOUT"};

  
};
const updateProfile = (payload,adminType="manager") => {
  return function(dispatch,getState){
    return ManagerService.updateProfile(payload)
    .then(
      res=>{
      localStorage.setItem('manager', JSON.stringify(res));
       
       dispatch({ type: "UPDATE_PROFILE", payload: res });
       return Promise.resolve({ok:true})
      },
      err=>{
       dispatch({ type: "UPDATE_PROFILE_FAILED", payload: err });
        return Promise.reject({message: err})
      }
    )
    }
};

/******************************************** LAYOUT ACTIONS *****************************************/
const updateSelectedLink = (payload) => {
  return { type: "UPDATE_SELECTED_NAVLINK", payload };
};

const exports = {
  login,  
  logout,
  updateProfile,
  updateSelectedLink,
};

export default exports;
