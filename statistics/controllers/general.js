const Enseignant = require("../../admin/models/enseignant");
const HttpError = require("../../shared/models/http-error");
const Manager = require("../../admin/models/manager");
const Classe = require("../../user/models/classe");
const Cours = require("../../user/models/cour");
const Eleve = require("../../user/models/eleve");
const codeAbonnement = require("../../user/models/codeAbonnement");

const getCounts = async (req, res, next) => {
  

  let eleves,abonnements,profs,cours,classes;
  try {
    eleves = await Eleve.count();
    profs = await Enseignant.count();
    cours = await Cours.count();
    classes = await Classe.count();
    abonnements = await codeAbonnement.count({is_taken:true});
  } catch (error) {
    console.log("Error: Could not aggregate eleves counts : ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, Impossible d'effectuer les calculs'",
        500
      )
    );
  }

  res
    .status(200)
    .json({ eleves,classes,abonnements,cours,profs });
};

exports.getCounts = getCounts;

