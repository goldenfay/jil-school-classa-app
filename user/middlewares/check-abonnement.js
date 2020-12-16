const mongoose = require("mongoose");
const expiration_abonnement = require("./expiration-abonnement");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") next();

  const { client } = req.userData;

  if (!client.is_abonne)
    return next(
      new HttpError(
        "Vous n'êtes pas abonné. Vous n'avez pas le droit à l'accés",
        403
      )
    );

  await expiration_abonnement(req, res, next);
  next();
};
