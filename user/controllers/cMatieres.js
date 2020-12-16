const HttpError = require("../../shared/models/http-error");
const Matiere = require("../models/matiere");
const DBInitializer = require("../../init/");

const getMatieres = async (req, res, next) => {
  if (!req.adminData) {
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer telle action.")
    );
  }
  let matieres;
  try {
    matieres = await Matiere.find({});
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver les matières. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  res
    .status(200)
    .json({ matieres: matieres.map((m) => m.toObject({ getters: true })) });
};

const addMatiere = async (req, res, next) => {
  if (!req.adminData) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Vous n'êtes pas autorisés à effectuer cette tâche",
        403
      )
    );
  }
  const raquiredParams = ["titre", "titreAr"];
  const keys = Object.keys(req.body);
  if (!raquiredParams.every((key) => keys.includes(key))) {
    return next(
      new HttpError(
        "Une Erreur s'est produite,Les paramètres envoyés ne sont pas valides",
        422
      )
    );
  }
  const { titre, titreAr, desc, image } = req.body;
  const newMatiere = new Matiere({
    titre,
    titreAr,
    desc,
  });
  if (!image) {
    newMatiere.image = "";
  }
  try {
    await newMatiere.save();
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible d'ajouter la matière. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  res.status(200).json({
    message: "Matière ajoutée avec succès",
  });
};

const initDatabase = async (req, res, next) => {
  if (!req.adminData) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Vous n'êtes pas autorisés à effectuer cette tâche",
        403
      )
    );
  }
  return DBInitializer.initializeMatieres().then(
    (res) => next(res),
    (error) => next(error)
  );
};

exports.getMatieres = getMatieres;
exports.addMatiere = addMatiere;
exports.initDatabase = initDatabase;
