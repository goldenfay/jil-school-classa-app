import { teacherConfig } from "./config";
import { handleResponse,checkRoleAutorizationFail, authHeader, login } from "./shared";



/**
 * Register a new teacher to the Admin application. Only Managers of the application can do such request due to privacy politic.
 * @param {*} data 
 */
const register = (data) => {
  if (checkRoleAutorizationFail(data))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement le Manager qui peut ajouter un enseignant",
    });
  const params = [
    "username",
    "nom",
    "prenom",
    "email",
    "matieresIds",
    "classesIds",
    "wilaya",
    "commune",
    "phone",
  ];
  const keys=Object.keys(data);
  if (!params.every((key) => keys.includes(key)))
    return Promise.reject({
      message: "Les paramètres de formulaire sont invalides",
    });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${teacherConfig.API_URL}/new`, requestOptions).then(
    handleResponse
  );
};
/**
 * Update teacher profile.
 * @param {*} data 
 */
const updateProfile = (data) => {
  if (checkRoleAutorizationFail(data,"teacher"))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'enseignant qui peut mettre à jours son profile",
    });
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
    headers: authHeader(),
    body: JSON.stringify(body),
  };
  return fetch(`${teacherConfig.API_URL}/${data.id}`, requestOptions).then(
    handleResponse
  );
};


/**
 * Fetch all teachers of the application. Only Managers of the application can do such request due to privacy politic.
 * @param {*} data 
 */
const getAll = (data) => {
  if (checkRoleAutorizationFail(data))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement le Manager qui récupérer tous les enseignants",
    });
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    // body: JSON.stringify(data),
  };

  return fetch(`${teacherConfig.API_URL}`, requestOptions).then(
    handleResponse
  );
};


/**
 * Fetch a teacher by its ID.
 * @param {*} id ID of the requested teacher
 * @returns
 */
function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${teacherConfig.API_URL}/${id}`, requestOptions).then(
    handleResponse
  );
}


function getProfCourses(data){
  if (!(data.adminType && data.adminType==="teacher"))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'enseignant qui récupérer tous ses cours",
    });
  if (!data.id)
    return Promise.reject({
      message:
        "Paramètres invalides",
    });
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${teacherConfig.API_URL}/cours/enseignants/${data.id}`, requestOptions).then(
    handleResponse
  );

}

function addNewCourse(data){
  if (checkRoleAutorizationFail(data,"teacher"))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'enseignant qui peut ajouter un cours",
    });
  const params = [
    "titre",
    "lien",
    "thumbnail",
    "titrePdf",
    "pdfFile",
    "questionsList",
  ];
  const keys=Object.keys(data);
  if (!params.every((key) => keys.includes(key)))
    return Promise.reject({
      message: "Les paramètres de formulaire sont invalides",
    });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${teacherConfig.API_URL}/cours/new`, requestOptions).then(
    handleResponse
  );

}

const teacherService = {
  login,
  register,
  updateProfile,
  getAll,
  getById,
  getProfCourses,
  addNewCourse
};

export default teacherService;
