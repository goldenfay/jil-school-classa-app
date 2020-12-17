const HttpError = require("../../shared/models/http-error");
const Enseignant = require("../models/enseignant");
const Manager = require("../models/manager");
const rejectPropsObject = require("../../shared/utils/reject-props-object");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { username, password, adminType } = req.body;

  let admin;
  try {
    if (adminType === "enseignant") {
      admin = await Enseignant.findOne({ username: username })
        .populate("matiere")
        .populate("classes");
    } else {
      admin = await Manager.findOne({ username: username });
    }
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de se connecter. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  if (!admin) {
    return next(new HttpError("Nom d'utilisateur introuvable", 404));
  }

  try {
    let isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword)
      return next(
        new HttpError("Nom d'utilisateur ou mot de passe invalide", 404)
      );
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de se connecter. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  
  let token;
  try {
    token = jwt.sign(
      {
        id: admin.id,
      },
      process.env.ADMIN_SECRET || "admin_secret"
      );
    } catch (error) {
      return next(
        new HttpError(
          "Une Erreur s'est produite lors de l'authentification. Veuillez réessayer ulterieurement",
          500
          )
          );
        }
        
       
  const responseObj = rejectPropsObject(admin.toObject({ getters: true }), [
    "password",
  ]);
  responseObj.image = responseObj.image.replace(
    /^uploads/,
    `${SERVER_ENV.address}:${SERVER_ENV.port}`
  );
  res
    .status(200)
    .json({ message: "Connexion Réussie", token, admin: responseObj });
};
