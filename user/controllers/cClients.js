const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Client = require("../models/client");
const HttpError = require("../../shared/models/http-error");
const Manager = require("../../admin/models/manager");
const rejectPropsObject = require("../../shared/utils/reject-props-object");
const Abonnement = require("../models/abonnement");
const Eleve = require("../models/eleve");
const RapportConnection = require("../models/rapportConnection");

const signinEleve = async (req, res, next) => {};

// pre-Sign In
const preSignin = async (req, res, next) => {
  const { username, password } = req.body;

  let client;
  let userData;
  try {
    client = await Client.findOne({ username: username }).populate("eleves");
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de se connecter. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  if (!client) {
    return next(new HttpError("Nom de compte ou mot de passe incorrect!", 422));
  }

  try {
    isValidPassword = await bcrypt.compare(password, client.password);
  } catch (error) {
    console.log("Error occurd when pre-signing in : ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de se connecter. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  if (!isValidPassword) {
    return next(new HttpError("Nom de compte ou mot de passe incorrect!", 422));
  }
  userData = { client };

  req.userData = userData;
  next();
};

// if(client.is_abonne) check abonnement(req, res, next) else next()

// Sign In
const signin = async (req, res, next) => {
  const { client } = req.userData;
  const { deviceDetect } = req.body;
  let token, authenticatedClient;
  try {
    if (client.is_abonne) {
      const newConnection = new RapportConnection({
        time: Date.now(),
        token,
        device: deviceDetect,
        eleve: null,
        client,
      });

      token = await jwt.sign(
        {
          id: client.id,
          idConnection: newConnection._id,
        },
        process.env.USER_SECRET || "user_secret",
        {
          expiresIn: "1d",
        }
      );
      newConnection.token = token;
      // Test if client have reached device connection limit
      if (client.connections.length >= client.limit_connection) {
        const sess = await mongoose.startSession();
        sess.startTransaction();

        const connectionId = client.connections.pop();
        await client.save();
        console.log("Connexion Id : ", connectionId);
        await RapportConnection.findByIdAndRemove(connectionId);
        
        sess.commitTransaction;
      }
      
      await newConnection.save();
      // This should be outside the if block, in all cases, we insert the new connection and update client
      await client.update({
        $push: { connections: newConnection },
      });
      await client.save();
      authenticatedClient = await Client.findById(client._id)
      .select("-password")
      .populate("eleves")
    } else {
      token = await jwt.sign(
        {
          id: client.id,
        },
        process.env.USER_SECRET || "user_secret"
      );
      authenticatedClient = client;
    }
  } catch (error) {
    console.log("Error occured when signing in the client : ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de se connecter. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  res
    .status(200)
    .json({
      message: "Connexion Réussie",
      is_connecte: true,
      token,
      client: rejectPropsObject(
        authenticatedClient.toObject({ getters: true }),
        ["password"]
      ),
    });
};

// SIGN UP
const signup = async (req, res, next) => {
  let { username, password, wilaya, commune, phone } = req.body;

  let client;
  try {
    client = await Client.findOne({ username: username });
  } catch (error) {
    console.log("An Error occured while fetching username if exists : ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible d'inscrire le client. Veuillez réessayer ulterieurement"
      )
    );
  }

  if (client) {
    return next(
      new HttpError(
        "Un Client existe déjà pour ce Username! Veuillez choisir un autre username",
        422
      )
    );
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, process.env.HASH_SALT || 12);
  } catch (error) {
    console.log("An Error occured while hashing user passord : ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible d'inscrire l'enseignant. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  const newClient = new Client({
    username,
    password: hashPassword,
    wilaya,
    commune,
    phone,
    abonnements: [],
    eleves: [],
    connections: [],
  });

  try {
    await newClient.save();
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Impossible d'inscrire le Client. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  let token;
  try {
    token = await jwt.sign(
      {
        id: newClient.id,
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

  let createdClient = rejectPropsObject(newClient.toObject({ getters: true }), [
    "username",
    "password",
  ]);

  res.status(201).json({
    message: "Inscription Réussie",
    token,
    createdClient: createdClient,
    is_connecte: true,
  });
};

// GET CLIENTS
const getClients = async (req, res, next) => {
  const managerId = req.adminData.id;
  let manager;
  try {
    manager = await Manager.findById(managerId);
  } catch (error) {
    return next(
      new HttpError(
        "Une erreur s'est produite, Impossible de trouver les clients",
        500
      )
    );
  }

  if (!manager) {
    return next(
      new HttpError("Vous n'avez pas le droit de faire cette opération", 401)
    );
  }

  let clients;
  try {
    clients = await Client.find({}, "-password -username")
      .populate({
        path: "eleves",
        populate: { path: "classe", select: "codeCl" },
      })
      .populate({ path: "abonnement" });
  } catch (error) {
    console.log("Error: Could not find client : ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, Impossible de trouver les clients",
        500
      )
    );
  }

  res
    .status(200)
    .json({ clients: clients.map((c) => c.toObject({ getters: true })) });
};

const abonnement = async (req, res, next) => {
  // {
  //   token, classes, clientId, type, codeAchat;
  // }
  return res.status(200).json({ message: "abonné", body: req.body });
};

exports.abonnement = abonnement;
exports.preSignin = preSignin;
exports.signin = signin;
exports.signup = signup;
exports.getClients = getClients;
