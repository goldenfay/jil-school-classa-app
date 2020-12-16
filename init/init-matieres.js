const HttpError = require("../shared/models/http-error");
const Matiere = require("../user/models/matiere");
const matieresDB = require("./DB/matieres");
const initMatieres = async () => {
  try {
    for (var i = 0; i < matieresDB.length; i++) {
      let matiere = matieresDB[i];

      if (!matiere.image) {
        matiere.image = "images/img-matiere.png";
      }
      const newMatiere = new Matiere(matiere);
      await newMatiere.save();
    }
  } catch (error) {
    return new HttpError(
      "Une erreur s'est produite lors de l'initialisation des matières" + error,
      500
    );
  }

  return Promise.resolve({
    ok: true,
    message: "La base de données Matiere est initialisée avec succès.",
  });
};

module.exports = initMatieres;
