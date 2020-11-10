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
    localStorage.setItem('enseignant', JSON.stringify(res));
     
     dispatch({ type: "UPDATE_PROFILE", payload: res });
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