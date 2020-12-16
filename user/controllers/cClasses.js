const HttpError = require("../../shared/models/http-error");
const Classe = require("../models/classe");
const DBInitializer = require("../../init/");

const getClasses = async (req, res, next) => {
  let classes;
  try {
    classes = await Classe.find({});
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
    .json({ classes: classes.map((c) => c.toObject({ getters: true })) });
};

const getClassesWithMatieres = async (req, res, next) => {
  let classes;
  try {
    classes = await Classe.find({}).populate("matieres");
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver les matières. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  res.status(200).json({
    classes: classes.map((c) => ({
      ...c.toObject({ getters: true }),
      matieres: c.matieres.map((m) => m.toObject({ getters: true })),
    })),
  });
};

const getOneClasseMatieres = async (req, res, next) => {
  const classeId = req.params.classeId;
  let classe;
  try {
    classe = await Classe.findById(classeId).populate("matieres");
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver les matières. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  res.status(200).json({
    classe: classe.map((c) => ({
      ...c.toObject({ getters: true }),
      matieres: c.matieres.map((m) => m.toObject({ getters: true })),
    })),
  });
};

const addClasse = async (req, res, next) => {
  if (!req.adminData) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Vous n'êtes pas autorisés à effectuer cette tâche",
        403
      )
    );
  }
  const raquiredParams = ["codeCl", "annee", "cycle", "matieres"];
  const keys = Object.keys(req.body);
  if (!raquiredParams.every((key) => keys.includes(key))) {
    return next(
      new HttpError(
        "Une Erreur s'est produite,Les paramètres envoyés ne sont pas valides",
        422
      )
    );
  }
  const { codeCl, annee, cycle, matieres, filiere } = req.body;
  const newClasse = new Classe({
    codeCl,
    annee,
    cycle,
    matieres,
    filiere,
  });
  try {
    await newClasse.save();
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible d'ajouter la nouvelle classe. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  res.status(200).json({
    message: "Classe ajoutée avec succès",
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
  return DBInitializer.initializeClasses().then(
    (res) => next(res),
    (error) => next(error)
  );
};
exports.getClasses = getClasses;
exports.getClassesWithMatieres = getClassesWithMatieres;
exports.getOneClasseMatieres = getOneClasseMatieres;
exports.addClasse = addClasse;
exports.initDatabase = initDatabase;
