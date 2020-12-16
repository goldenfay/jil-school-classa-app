const HttpError = require("../../shared/models/http-error");
const mongoose = require("mongoose");
const Manager = require("../../admin/models/manager");
const CodeAbonnement = require("../models/codeAbonnement");
const Abonnement = require("../models/abonnement");
const RapportConnection = require("../models/rapportConnection");
const Eleve = require("../models/eleve");
const Classe = require("../models/classe");
const Client = require("../models/client");
const expiration_abonnement = require("../middlewares/expiration-abonnement");
const jwt = require("jsonwebtoken");

const createAbonnement = async (req, res, next) => {
  if (req.body.userType !== "client")
    return next(
      new HttpError("Vous n'avez pas le droit de faire cette opération", 401)
    );

  const { code, type, duree, deviceDetect, classesIds } = req.body;

  const { client } = req.userData;

  await expiration_abonnement(req, res, next);

  let codeAbonnement;
  try {
    codeAbonnement = await CodeAbonnement.findOne({ code: code });
  } catch (error) {
    console.log("An Error occured while fetching code if exists", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, Impossible d'abonner le client. Veuillez réessayer ultérieurement"
      )
    );
  }
  if (!codeAbonnement || codeAbonnement.is_taken)
    return next(new HttpError("Le Code est invalide!", 422));

  let newConnection = new RapportConnection({
    device: deviceDetect,
    client,
  });

  let token;
  try {
    token = await jwt.sign(
      {
        id: client.id,
        connectionId: newConnection.id,
      },
      process.env.USER_SECRET || "user_secret"
    );
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Impossible d'abonner le client. Veuillez réessayer ultérieurement",
        500
      )
    );
  }
  newConnection.token = token;
  let limit_connection = parseInt(codeAbonnement.type.charAt(0));
  codeAbonnement.is_taken = true;

  let classes = [],
    eleves = [];
  try {
    classes = await Classe.find({
      _id: {
        $in: classesIds,
      },
    });
    if (
      !classes ||
      classes.length !== classesIds.length ||
      limit_connection !== classes.length
    )
      throw Error("error");
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Impossible d'abonner le client. les classes sont introuvable",
        500
      )
    );
  }

  let client_abonne;
  try {
    let sess = await mongoose.startSession();
    sess.startTransaction();

    // Save Abonnement
    let newAbonnement = new Abonnement({
      code_achat: code,
      type,
      duree,
      date_fin: new Date(new Date().getTime() + duree * 30 * 24 * 60 * 60000),
      is_abonne: true,
      client,
      classes,
    });
    await newAbonnement.save({ session: sess });

    // Create New Connection
    await newConnection.save({ session: sess });

    await codeAbonnement.save({ session: sess });

    for (let i = 0; i < limit_connection; i++) {
      let newEleve = new Eleve({
        nom: `Eleve${i + 1}`,
        sexe: "M",
        age: Math.floor(Math.random() * (15 - 7 + 1) + 7),
        client: client._id,
        classe: classes[i],
      });
      await newEleve.save({ session: sess });
      eleves.push(newEleve);
    }
    client.eleves = eleves;

    client.connections = [newConnection.id];
    client.is_abonne = true;
    client.limit_connection = limit_connection;
    client.abonnement = newAbonnement.id;
    await client.save({ session: sess });
    client_abonne = await Client.findById(client.id)
      .select("-username -password")
      .session(sess);
    await sess.commitTransaction();
    sess.endSession();
  } catch (error) {
    console.log("An error occured when trying to create new abonnement : ",error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, Impossible d'abonner le client. Veuillez réessayer ultérieurement",
        500
      )
    );
  }

  res.status(200).json({
    message: "Nouvel Abonnement Réussi",
    token: newConnection.token,
    eleves,
    client: client_abonne,
    is_connecte: true,
  });
};

// GET ABONNEMENTS
const getAllAbonnements = async (req, res, next) => {
  const managerId = req.adminData.id;
  let manager;
  try {
    manager = await Manager.findById(managerId);
  } catch (error) {
    return next(
      new HttpError(
        "Une erreur s'est produite, Impossible de trouver les abonnements",
        500
      )
    );
  }

  if (!manager) {
    return next(
      new HttpError("Vous n'avez pas le droit de faire cette opération", 401)
    );
  }

  let abonnements;
  try {
    abonnements = await Abonnement.find({})
      .populate({
        path: "client",
        select: "_id username",
      })
      .populate({
        path: "classes",
        select: "_id codeCl",
      });
  } catch (error) {
    console.log("Error: Could not find abonnements : ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, Impossible de trouver les abonnements",
        500
      )
    );
  }

  res
    .status(200)
    .json({
      abonnements: abonnements.map((c) => c.toObject({ getters: true })),
    });
};
exports.createAbonnement = createAbonnement;
exports.getAllAbonnements = getAllAbonnements;
