const HttpError = require("../../shared/models/http-error");
const jwt = require("jsonwebtoken");
const Eleve = require("../models/eleve");
const Client = require("../models/client");
const Classe = require("../models/classe");
const RapportConnection = require("../models/rapportConnection");
const Enseignant = require("../../admin/models/enseignant");

const getAllEleves = async (req, res, next) => {
  if (!req.adminData) {
    return next(
      new HttpError(
        "Vous n'êtes pas autorisés à effectuer cette opération",
        403
      )
    );
  }

  let eleves;
  try {
    eleves = await Eleve.find({})
      .select("nom sexe age classe")
      .populate("classe", "codeCl");
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
    .json({ eleves: eleves.map((c) => c.toObject({ getters: true })) });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getClasseEleves = async (req, res, next) => {
  if (!req.adminData) {
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action.")
    );
  }
  const classeId = req.params.classeId;
  let classe;
  try {
    classe = await Classe.findById(classeId);
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver la classe. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  if (!classe) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, La classe indiquée est  introuvable."
      ),
      422
    );
  }

  let eleves;
  try {
    eleves = await Eleve.find({ classe: classeId }).select(
      "nom sexe age avatar"
    );
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver eleves concernés. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  res
    .status(200)
    .json({ eleves: eleves.map((c) => c.toObject({ getters: true })) });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getElevesByClientId = async (req, res, next) => {
  if (!req.userData) {
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action.")
    );
  }
  const clientId = req.params.classeId;

  let eleves;
  try {
    eleves = await Eleve.find({ classe: clientId }).populate("classe");
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver eleves concernés. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  res
    .status(200)
    .json({ eleves: eleves.map((c) => c.toObject({ getters: true })) });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getElevesByEnsClasses = async (req, res, next) => {
  if (!req.adminData || req.headers.admintype !== "enseignant") {
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action.")
    );
  }
  const ensId = req.params.ensId;
  let enseignant;
  try {
    enseignant = await Enseignant.findById(ensId);
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver l'enseignant. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  if (!enseignant) {
    return next(
      new HttpError("Une Erreur s'est produite, Enseignant introuvable."),
      422
    );
  }

  let eleves;
  try {
    eleves = await Eleve.find({ classe: { $in: enseignant.classes } }).select(
      "nom sexe age avatar"
    );
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver eleves concernés. Veuillez réessayer ulterieurement",500
      ) 
    );
  }
  res
    .status(200)
    .json({ eleves: eleves.map((c) => c.toObject({ getters: true })) });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const signinEleve = async (req, res, next) => {
  if (!req.userData) {
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action.")
    );
  }
  const { client} = req.userData;
  const { eleveId} = req.body

  if (!client)
    return next(
      new HttpError(
        "Vous n'êtes pas authentifié pour effectuer cette tâche. Veuillez vous connecter.",422
      )
    );
    
    
  let searchedEleve;
  try {
    searchedEleve = await Eleve.findOne({
     _id:  eleveId,
     client: client._id,
    });
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver l'eleve. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  if (!searchedEleve)
    return next(
      new HttpError(
        "Echec d'authentification. Impossible de trouver l'eleve. Veuillez vous connecter.",403
      )
      
    );
  let token = req.headers.authorization;

  if (!token) {
    throw Error("Paramètres d'authentification non valides");
  }
  token=token.split(" ")[1];
  const decodedToken = await jwt.verify(
    token,
    process.env.USER_SECRET || "user_secret"
  );
  let connection;
  try {
    connection = await RapportConnection.findById(decodedToken.idConnection);
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de vous identifier. Veuillez réessayer ulterieurement",500
      )
      
    );
  }
  if (!connection)
    return next(
      new HttpError(
        "Echec d'authentification. de vous identifier. Veuillez vous connecter.",403
      )
      
    );

    let newToken;
    try {
      newToken = await jwt.sign(
        {
          id:decodedToken.id,
          eleveId: eleveId,
          idConnection: connection._id,
        },
        process.env.USER_SECRET || "user_secret"
      );
    } catch (error) {
      return next(
        new HttpError(
          "Une Erreur s'est produite, impossible d'inscrire le client. Veuillez réessayer ulterieurement",
          500
        )
      );
    }

    connection.eleve=searchedEleve
      // To be reviewed
    connection.token=newToken
    await connection.save()
    
    res.status(200).json({ok: true, message: "Authentification complète.", is_connecte: true, token:newToken})
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const logoutEleve = async (req, res, next) => {
  if (!req.userData) {
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action.")
    );
  }
  const {eleveId} = req.body;
  let eleve;
  try {
    eleve = await Eleve.findById(eleveId);
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver l'eleve. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  if (!eleve) {
    return next(
      new HttpError("Une Erreur s'est produite, Eleve introuvable."),
      422
    );
  }

  let client;
  try {
    client = await Client.findById(eleve.client).populate("connections");
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de déconnecter normalement. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }

  try {
    client.connections = client.connections.filter(
      (connection) => connection.eleve._id !== eleveId
    );
    await client.save();
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver eleves concernés. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  res.status(200).json({ ok: true, message: "Déconnexion réussie" });
};

exports.getAllEleves = getAllEleves;
exports.getClasseEleves = getClasseEleves;
exports.getElevesByEnsClasses = getElevesByEnsClasses;
exports.getElevesByClientId = getElevesByClientId;
exports.signinEleve = signinEleve;
exports.logoutEleve = logoutEleve;
