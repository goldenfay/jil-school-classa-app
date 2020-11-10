import {managerConfig} from './config'
import {handleResponse,checkRoleAutorizationFail,authHeader,login} from './shared'

/**
 * Update teacher profile.
 * @param {*} data 
 */
const updateProfile = (data) => {
  if (checkRoleAutorizationFail(data))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'administrateur qui peut mettre à jours son profile",
    });
  const {adminType}=data;  
  const params = [
    "nom",
    "prenom",
    "email",
    "phone",
    "avatar",
    "password"
  ];
  
  const body=Object.assign({},...(Object.keys(data).filter(key=> params.includes(key)).map((key)=>({[key]: data[key]})) ) )
  const requestOptions = {
    method: "PUT",
    headers: {...authHeader(),'Content-Type':'application/json'},
    body: JSON.stringify({...body,adminType}),
  };
  return fetch(`${managerConfig.API_URL}/${data.id}`, requestOptions).then(
    handleResponse
  );
};



/**
 * Fetch all customers from the Database. Only Managers of the application can do such request
 * @param {*} data An object containing infos about the requester
 */
const getAllAbonnes = (data) => {
    if (checkRoleAutorizationFail(data))
      return Promise.reject({
        message:
          "Non autorisé! Uniquement le Manager qui récupérer tous les abonnés",
      });
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
      // body: JSON.stringify(data),
    };
  
    return fetch(`${managerConfig.API_URL}/clients`, requestOptions).then(
      handleResponse
    );
  };

/**
 * Fetch all students from the Database. Only Managers of the application can do such request
 * @param {*} data 
 */
const getAllEleves = (data) => {
    if (checkRoleAutorizationFail(data))
      return Promise.reject({
        message:
          "Non autorisé! Uniquement le Manager qui récupérer tous les élèves",
      });
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
      // body: JSON.stringify(data),
    };
  
    return fetch(`${managerConfig.API_URL}/eleves`, requestOptions).then(
      handleResponse
    );
  };



/**
 * Fetch all classes
 * @param {*} data 
 */
const getAllClasses = (data) => {
    if (checkRoleAutorizationFail(data))
      return Promise.reject({
        message:
          "Non autorisé! Uniquement le Manager qui récupérer tous les classes",
      });
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
      // body: JSON.stringify(data),
    };
  
    return fetch(`${managerConfig.USERS_API_URL}/classes`, requestOptions).then(
      handleResponse
    );
  };

/**
 * Fetch all classes with all matieres
 * @param {*} data 
 */
const getAllMatieres = (data) => {
    if (checkRoleAutorizationFail(data))
      return Promise.reject({
        message:
          "Non autorisé! Uniquement le Manager qui récupérer tous les classes",
      });
    const requestOptions = {
      method: "GET",
      headers: {...authHeader(),adminType: data.adminType},
      // body: JSON.stringify(data),
    };
  
    return fetch(`${managerConfig.USERS_API_URL}/matieres/`, requestOptions).then(
      handleResponse
    );
  };

/**
 * Fetch all classes with all matieres
 * @param {*} data 
 */
const getAllClassesMatieres = (data) => {
    if (checkRoleAutorizationFail(data))
      return Promise.reject({
        message:
          "Non autorisé! Uniquement le Manager qui récupérer tous les classes",
      });
    const requestOptions = {
      method: "GET",
      headers: {...authHeader(),adminType: data.adminType}
    };
  
    return fetch(`${managerConfig.USERS_API_URL}/classes/matieres`, requestOptions).then(
      handleResponse
    );
  };




const managerService={
    login,
    updateProfile,
    getAllAbonnes,
    getAllEleves,
    getAllClasses,
    getAllMatieres,
    getAllClassesMatieres

}

export default managerService