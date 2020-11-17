import TeacherService from "../../services/teacherServices";

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('enseignant');
  return { type: "LOGOUT"};

  
};

const updateProfile = (payload) => {
  return function(dispatch,getState){
  return TeacherService.updateProfile(payload)
  .then(
    res=>{
      const oldUser=JSON.parse(localStorage.getItem('enseignant'))
      const updateUser={...oldUser,...res};
    localStorage.setItem('enseignant', JSON.stringify(updateUser));
     
     dispatch({ type: "UPDATE_PROFILE", payload: updateUser });
     return Promise.resolve({ok:true})
    },
    err=>{
     dispatch({ type: "UPDATE_PROFILE_FAILED", payload: err });
      return Promise.reject({message: err})
    }
  )
  }

  // const old=JSON.parse(localStorage.getItem(adminType));
  // localStorage.setItem(adminType,JSON.stringify({...old,...payload}));

};
const exports = {
    logout,
    updateProfile
  };
  
  export default exports;