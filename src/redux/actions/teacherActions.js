import TeacherService from "../../services/teacherServices";

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('teacher');
  return { type: "LOGOUT"};

  
};

const updateProfile = (payload) => {
  return TeacherService.updateProfile(payload)
  .then(
    res=>{

      return { type: "UPDATE_PROFILE", res };
    },
    err=>{
      return { type: "UPDATE_PROFILE_FAILED", err };

    }
  )

  // const old=JSON.parse(localStorage.getItem(adminType));
  // localStorage.setItem(adminType,JSON.stringify({...old,...payload}));

};
const exports = {
    logout,
    updateProfile
  };
  
  export default exports;