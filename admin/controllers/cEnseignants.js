const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const HttpError = require("../../shared/models/http-error");
const Enseignant = require("../models/enseignant");
const Matiere = require("../../user/models/matiere");
const Classe = require("../../user/models/classe");
const EmailSender = require("../../shared/utils/mailer");

const getEnseignantById = async (req, res, next) => {
  const { admin } = req.adminData;
  const { adminType } = req.body;
  let enseignant;
  if (adminType === "enseignant") {
    if (req.adminData.id != req.params.id)
      return next(new HttpError("L'enseignant n'a pas été trouvé!", 404));

    enseignant = admin;
  } else {
    try {
      enseignant = await Enseignant.findById(req.params.id)
        .populate("matiere")
        .populate("classes")
        .populate({
          path: "cours",
          options: { limit: 10, sort: { date_ajout: -1 } },
        });
    } catch (error) {
      return next(
        new HttpError(
          "Une Erreur s'est produite, impossible de trouver l'enseignant. Veuillez réessayer ulterieurement",
          500
        )
      );
    }
    if (!enseignant)
      return next(new HttpError("L'enseignant n'a pas été trouvé!", 404));
  }
  const { password, username, ...enseignantObject } = enseignant.toObject({
    getters: true,
  });
  res.status(200).json(enseignantObject);
};

const getEnseignants = async (req, res, next) => {
  const { admintype } = req.headers;
  if (admintype !== "manager")
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action", 403)
    );

  let enseignants;
  try {
    enseignants = await Enseignant.find({})
      .select("-password -username")
      .populate("matiere")
      .populate("classes")
      .populate({
        path: "cours",
        select: "date_ajout",
        options: { limit: 1, sort: { date_ajout: -1 } },
      });
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Impossible de retrouver les enseignants",
        500
      )
    );
  }
  res.status(200).json({
    enseignants: enseignants.map((e) => e.toObject({ getters: true })),
  });
};

const addEnseignant = async (req, res, next) => {
  const {
    username,
    email,
    nom,
    prenom,
    matiereId,
    classesIds,
    wilaya,
    commune,
    phone,
  } = req.body;


  let enseignant;
  try {
    enseignant = await Enseignant.findOne({ username: username });
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible d'ajouter l'enseignant. Veuillez réessayer ulterieurement"
      )
    );
  }

  if (enseignant) {
    return next(
      new HttpError(
        "Un Enseignant existe déjà avec ce Username! veuillez choisir un autre Username",
        422
      )
    );
  }

  const password = uuidv4();
  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, process.env.HASH_SALT || 12);
  } catch (error) {
    console.error(error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible d'ajouter l'enseignant. Veuillez réessayer ulterieurement",
        500
      )
    );
  }
  const newEnseignant = new Enseignant({
    username: username,
    password: hashPassword,
    email,
    nom,
    prenom,
    matiere: matiereId,
    classes: classesIds,
    wilaya,
    commune,
    phone,
    cours: [],
  });

  let savedEnseignant;
  try {
    savedEnseignant = await newEnseignant.save();
  } catch (error) {
    console.error(error);
    return next(
      new HttpError(
        "Une Erreur s'est produite lors de l'enregistrement de l'enseignant. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  savedEnseignant.password = password;

  try {
    const emailBody = {
      text: `Congratulations \n ${savedEnseignant.username} ${savedEnseignant.password}`,
    };
    EmailSender(
      "confirm@classa-app.com",
      "disoh12166@tawtar.com",
      emailBody
    ).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  } catch (err) {}
  res.status(201).json({
    message: "Opération Réussie",
    savedEnseignant: savedEnseignant.toObject({ getters: true }),
  });
};

exports.getEnseignants = getEnseignants;
exports.addEnseignant = addEnseignant;
exports.getEnseignantById = getEnseignantById;
