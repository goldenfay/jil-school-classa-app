const HttpError = require("../../shared/models/http-error");
const CodeAbonnement = require("../models/codeAbonnement");

const achatCodeAbonnement = async (req, res, next) => {
  if (userType !== "client") {
    return next(
      new HttpError("Vous n'avez pas le droit de faire cette opération"),
      401
    );
  }

  let codeAbonnement;
  try {
    codeAbonnement = 5;
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Impossible de valider votre code. Veuillez réessayer ulterieurement",
        500
      )
    );
  }
};
const addTestCodes = async (req, res, next) => {};

exports.addTestCodes = addTestCodes;
exports.achatCodeAbonnement = achatCodeAbonnement;
