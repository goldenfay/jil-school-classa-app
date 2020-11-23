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
    "image",
    "oldPassword",
    "newPassword"
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
      headers: {...authHeader(),'Content-Type':'application/json', 'adminType':data.adminType}
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
      headers: {...authHeader(),'Content-Type':'application/json', 'adminType':data.adminType}
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
      headers: {...authHeader(),'Content-Type':'application/json', 'adminType':data.adminType}
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

/**
 * Insert a new Pub.
 * @param {*} data 
 */
const addPub = (data,optionalOpts) => {
  console.log(data.adminType)
  if (checkRoleAutorizationFail(data))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'administrateur qui peut ajouter des Pubs",
    });
  const requiredParams = [
    "sponsor", "titre","type","image"
  ];
  if(!requiredParams.every(attr=> Object.keys(data).find(key=> key===attr)))
  return Promise.reject({
    message:
      "Paramètres manquants",
  });
  const {adminType}=data;
  const fd = new FormData();
  Object.keys(data).forEach(el=> {
    if(requiredParams.includes(el)) fd.append(el,data[el])
  })
  fd.append('adminType',adminType)
  if (data.link) fd.append('link',data.link)
  const requestOptions = {
    method: "POST",
    headers: {...authHeader()},
    body: fd,
    ...optionalOpts
  };
  return fetch(`${managerConfig.USERS_API_URL}/pubs/new`, requestOptions).then(
    handleResponse
  );
};
/**
 * Update a pub.
 * @param {*} data 
 */
const updatePub = (data,optionalOpts) => {
  if (checkRoleAutorizationFail(data))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'administrateur qui peut ajouter des Pubs",
    });
  
  if(!data.id)
  return Promise.reject({
    message:
      "Paramètres manquants",
  });
  const params = [
    "sponsor", "titre","type","image"
  ];
  const {adminType}=data;
  const fd = new FormData();
  Object.keys(data).forEach(el=> {
    if(params.includes(el)) fd.append(el,data[el])
  })
  fd.append('adminType',adminType)
  if (data.link) fd.append('link',data.link)
  const requestOptions = {
    method: "PUT",
    headers: {...authHeader()},
    body: fd,
    ...optionalOpts
  };
  return fetch(`${managerConfig.USERS_API_URL}/pubs/${data.id}`, requestOptions).then(
    handleResponse
  );
};

/**
 * Delete a pub.
 * @param {*} data 
 */
const deletePub = (data,optionalOpts) => {
  console.log(data.adminType)
  if (checkRoleAutorizationFail(data))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'administrateur qui peut ajouter des Pubs",
    });
  if(!data.id)
    return Promise.reject({
      message:
        "Paramètres manquants",
    });
  
  const requestOptions = {
    method: "DELETE",
    headers: {...authHeader(),'Content-Type':'application/json'},
    body: JSON.stringify(data),
   
  };
  return fetch(`${managerConfig.USERS_API_URL}/pubs/${data.id}`, requestOptions).then(
    handleResponse
  );
};

/**
 * Fetch all pubs
 * @param {*} data 
 */
const getAllPubs = (data) => {
  if (checkRoleAutorizationFail(data))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement le Manager qui récupérer toutes les pubs",
    });
  const requestOptions = {
    method: "GET",
    headers: {...authHeader(),adminType: data.adminType,'Content-Type':'application/json'}
  };

  return fetch(`${managerConfig.USERS_API_URL}/pubs`, requestOptions).then(
    handleResponse
  );
};


/**
 * Fetch Profs summary
 * @param {*} data 
 */
const getProfsStatistics = (data) => {
  if (checkRoleAutorizationFail(data))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement le Manager qui récupérer ces informations",
    });
  const requestOptions = {
    method: "GET",
    headers: {...authHeader(),adminType: data.adminType}
  };

  return fetch(`${managerConfig.STATS_API_URL}/enseignants/summary`, requestOptions).then(
    handleResponse
  );
};

/**
 * Fetch Eleves summary
 * @param {*} data 
 */
const getElevesStatistics = (data) => {
  if (checkRoleAutorizationFail(data))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement le Manager qui récupérer ces informations",
    });
  const requestOptions = {
    method: "GET",
    headers: {...authHeader(),adminType: data.adminType}
  };

  return fetch(`${managerConfig.STATS_API_URL}/eleves/summary`, requestOptions).then(
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
    getAllClassesMatieres,
    getAllPubs,
    addPub,
    updatePub,
    deletePub,
    getProfsStatistics,
    getElevesStatistics


}

export default managerService