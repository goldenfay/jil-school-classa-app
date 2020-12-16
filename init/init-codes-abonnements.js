const HttpError = require("../shared/models/http-error");
const CodeAbonnement = require("../user/models/codeAbonnement");
const codesAboonnementsDB = require("./DB/codesAbonnements");
const initCodesAbonnements = async () => {
  try {
    for (var i = 0; i < codesAboonnementsDB.length; i++) {
      let codeAbonnement = codesAboonnementsDB[i];

      const newCodeAbonnement = new CodeAbonnement(codeAbonnement);
      await newCodeAbonnement.save();
    }
  } catch (error) {
    return new HttpError(
      "Une erreur s'est produite lors de l'initialisation des codes d'abonnements" +
        error,
      500
    );
  }

  return Promise.resolve({
    ok: true,
    message: "La base de données Code Abonnement est initialisée avec succès.",
  });
};

module.exports = initCodesAbonnements;
