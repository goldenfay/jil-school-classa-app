import {managerConfig} from './config'

/**
 * Login service API call, for both Manager and Teacher
 * @param {*} username : Admin (Teacher or Manager) username
 * @param {*} password : Admin's password
 * @param {*} adminType : Admin type (Teacher or Manager)
 * Return: Promise with : admin row and token if success. reject otherwise
 */
const login =(username,password,adminType)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password,adminType })
      }
      return fetch(`${managerConfig.API_URL}/signin`, requestOptions)
      .then(handleResponse)
      .then(res => {
        let adminObj={...res.admin,description: adminType==='manager'?"Admin d'application":`Enseignant(e) en ${res.admin.matiere.titre}`};
        // login successful if there's a jwt token in the response
        if (res.token) {
          // store user details and jwt token in local storage to keep user logged 
          localStorage.setItem(adminType==='manager'?'manager':'enseignant', JSON.stringify(adminObj))
          localStorage.setItem('token', JSON.stringify(res.token))
        }
  
        return adminObj
      },
      err=>{
        return  Promise.reject(err.message?err.message: err);
      }
   
      )  


}



/**
 * get Database general counts
 * 
 */
const getGeneralStatistics = () => {
  
  const requestOptions = {
    method: "GET",
    headers: {'Content-Type':'application/json'}
  };

  return fetch(`${managerConfig.STATS_API_URL}/counts`, requestOptions).then(
    handleResponse
  );
};









/**
 * Add token Authorization entry to header request.
 */

function authHeader () {
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('token'))
  
    if (token) {
      return { 'Authorization': 'Bearer ' + token }
    } else {
      return {'Authorization':''}
    }
  }

/**
 * Check if the requester is the application manager.
 * @param {*} data 
 */  
const checkRoleAutorizationFail = (data,role="manager") => {
  return !(data.adminType && data.adminType === role);
};

function handleResponse (response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text)
      if (!response.ok) {
       
  
        const error = (data && data.message) || (response.status>=500?"Impossible de contacter le serveur":response.statusText)
        return Promise.reject(error)
      }
  
      return Promise.resolve(data)
    })
  }


export {handleResponse,login,authHeader,checkRoleAutorizationFail,getGeneralStatistics}  