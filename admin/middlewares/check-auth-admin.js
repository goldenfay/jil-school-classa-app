const jwt = require("jsonwebtoken");
const HttpError = require("../../shared/models/http-error");
const Enseignant = require("../models/enseignant");
const Manager = require("../models/manager");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("Echec Authentification");

    const decodeToken = await jwt.verify(
      token,
      process.env.ADMIN_SECRET || "admin_secret"
    );

    const adminType =
      req.method === "GET" ? req.headers.admintype : req.body.adminType;

    if (!adminType) {
      return next(
        new HttpError("Vous n'avez pas le droit d'effectuer cette opération"),422
      );
    }

    let admin;
    if (adminType === "enseignant") {
      admin = await Enseignant.findById(decodeToken.id);
    } else {
      admin = await Manager.findById(decodeToken.id);
    }

    if (!admin) {
      return next(
        new HttpError("Vous n'avez pas le droit d'effectuer cette opération"),401
      );
    }

    req.adminData = {
      id: decodeToken.id,
      admin,
    };
    next();
  } catch (error) {
    console.log("Admin authentication Error : ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, Echec d'authentification. Veuillez réessayer ulterieurement",
        403
      )
    );
  }
};
