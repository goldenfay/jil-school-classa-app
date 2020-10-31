import {managerConfig} from './config'
import {handleResponse,checkRoleAutorizationFail,authHeader,login} from './shared'




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
  
    return fetch(`${managerConfig.API_URL}/classes`, requestOptions).then(
      handleResponse
    );
  };




const managerService={
    login,
    getAllAbonnes,
    getAllEleves,
    getAllClasses

}

export default managerService