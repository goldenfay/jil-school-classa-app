const HttpError = require("../shared/models/http-error");
const Manager = require("../admin/models/manager");
const managersDB = require("./DB/managers");


const initManagers = async (withTeachers=false) => {
  try {
    
    for (var i = 0; i < managersDB.length; i++) {
      let manager = managersDB[i];

      const newManager = new Manager(manager);
      await newManager.save();
    }
  } catch (error) {
    return new HttpError(
      "Une erreur s'est produite lors de l'initialisation de l'admin " + error,
      500
    );
  }

  return Promise.resolve({
    ok: true,
    message: "La base de données Manager est initialisée avec succès.",
  });
};

module.exports = initManagers;
