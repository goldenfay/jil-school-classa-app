import { teacherConfig,managerConfig } from "./config";
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
    "phone",
    "matiereId",
    "classesIds",
    "wilaya",
    "commune",
    
  ];
    // Filter any params out of params Set
  const keys=Object.keys(data).filter(el=>params.includes(el));
    // Ensure that there is only params attributs, not less, not more
  if (!params.every((key) => keys.includes(key)))
    return Promise.reject({
      message: "Les paramètres de formulaire sont invalides",
    });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json",...authHeader() },
    body: JSON.stringify(data),
  };

  return fetch(`${teacherConfig.API_URL}/new`, requestOptions).then(
    handleResponse
  );
};


/**
 * Delete prof.
 * @param {*} data 
 */
const deleteProf = (data,optionalOpts) => {
  if (checkRoleAutorizationFail(data))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'enseignant qui peut supprimer un cours",
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
  return fetch(`${managerConfig.API_URL}/cours/${data.id}`, requestOptions).then(
    handleResponse
  );
};


/**
 * Update teacher profile.
 * @param {*} data 
 */
const updateProfile = (data) => {
  if (checkRoleAutorizationFail(data,"enseignant"))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'enseignant qui peut mettre à jours son profile",
    });
  const params = [
    "id",
    "nom",
    "prenom",
    "email",
    "phone",
    "image",
    "password",
    "oldPassword",
    "newPassword"
  ];
  const {adminType}=data;
  const fd = new FormData();
  Object.keys(data).forEach(el=> {
    if(params.includes(el)) fd.append(el,data[el])
  })
  fd.append('adminType',adminType)
  
  const requestOptions = {
    method: "PUT",
    headers:{...authHeader()},
    body:fd
  };
  return fetch(`${managerConfig.API_URL}/${data.id}`, requestOptions).then(
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
    headers: {...authHeader(),adminType: data.adminType},
  };

  return fetch(`${teacherConfig.API_URL}/`, requestOptions).then(
    handleResponse
  );
};


/**
 * Fetch a teacher by its ID.
 * @param {*} id ID of the requested teacher
 * @returns
 */
function getById(data) {
  if (checkRoleAutorizationFail(data))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement le Manager qui récupérer tous les enseignants",
    });
  const requestOptions = {
    method: "GET",
    headers: {...authHeader(),adminType: data.adminType},
  };

  return fetch(`${teacherConfig.API_URL}/${data.id}`, requestOptions).then(
    handleResponse
  );
}

/**
 * Fetch all teacher courses.
 * @param {*} data 
 */
function getProfCourses(data){
  if (!(data.adminType && data.adminType==="enseignant"))
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
    headers: {...authHeader(),adminType: data.adminType},
  };

  return fetch(`${teacherConfig.USERS_API_URL}/cours/enseignants/${data.id}`, requestOptions).then(
    handleResponse
  );

}

/**
 * Add a new course.
 * @param {*} data 
 */
function addNewCourse(data){
  if (checkRoleAutorizationFail(data,"enseignant"))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'enseignant qui peut ajouter un cours",
      });
  const params = [
    "titre",
    "ordre",
    "trimestre",
    "video",
    "enseignant",
    "matiere",
    "classe",
    "thumbnail",
    "titrePdf",
    "pdf",
    "questionsList",
  ];
  const keys=Object.keys(data);
  if (!params.every((key) => keys.includes(key)))
    return Promise.reject({
      message: "Les paramètres de formulaire sont invalides",
    });

    const fd=new FormData()
  params.forEach(key=> fd.append(key,data[key]) )
  fd.set('questionsList',JSON.stringify(data.questionsList.map(qst=>({
    questionImgName: qst.questionImg!==null ?qst.questionImg.file.name:null,
    answerImgName: qst.answerImg!==null?qst.answerImg.file.name:null,
  }))))
  data.questionsList.forEach(qst=>{
    if(qst.questionImg && qst.questionImg!==null)
    fd.append('cartesQuestions',qst.questionImg.file)
    if(qst.answerImg && qst.answerImg!==null)
    fd.append('cartesAnswers',qst.answerImg.file)
  })
  fd.append("adminType",data["adminType"])
  // fd.append('cartes',data.questionsList.map(qst=>qst.questionImg).filter(el=> el && el!==null))
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader() },
    body: fd
  };
  
  return fetch(`${teacherConfig.USERS_API_URL}/cours/new`, requestOptions).then(
    handleResponse
    );
    
  }


/**
 * Delete a course.
 * @param {*} data 
 */
const deleteCourse = (data,optionalOpts) => {
  if (checkRoleAutorizationFail(data,"enseignant"))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'enseignant qui peut supprimer un cours",
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
  return fetch(`${teacherConfig.USERS_API_URL}/cours/${data.id}`, requestOptions).then(
    handleResponse
  );
};

/**
 * Fetch all students teached by a teacher.
 * @param {*} data 
 */
function getProfEleves(data){
  if (checkRoleAutorizationFail(data,"enseignant"))
    return Promise.reject({
      message:
        "Non autorisé! Uniquement l'enseignant qui récupérer les élèves spécifiés",
    });
  if (!data.id)
    return Promise.reject({
      message:
        "Paramètres invalides",
    });
  const requestOptions = {
    method: "GET",
    headers: {...authHeader(),adminType: data.adminType},
  };

  return fetch(`${teacherConfig.USERS_API_URL}/eleves/enseignants/${data.id}`, requestOptions).then(
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
  addNewCourse,
  deleteCourse,
  getProfEleves
};

export default teacherService;
