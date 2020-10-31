import ManagerService from "../../services/managerServices";

const login = (formData) => {
  const { username, password, adminType } = formData;
  return ManagerService.login(username, password, adminType).then(
    (manager) => {

      return { type: "SET_CURRENT_MANAGER", payload: manager };
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
  // localStorage.removeItem('teacher');
  return { type: "LOGOUT"};

  
};
const updateProfile = (payload,adminType="manager") => {
  // ManagerService.

  // const old=JSON.parse(localStorage.getItem(adminType));
  // localStorage.setItem(adminType,JSON.stringify({...old,...payload}));

  return { type: "UPDATE_PROFILE", payload };
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
