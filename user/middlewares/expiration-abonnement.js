const Abonnement = require("../models/abonnement");

module.exports = async (req, res, next) => {
  const { client } = req.userData;
  if (client.date_fin < Date.now()) {
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await Abonnement.findOneAndUpdate(
        { id: client.abonnement },
        { is_abonne: false },
        { session: sess }
      );
      client.connections = [];
      client.is_abonne = false;
      client.abonnement = null;
      await client.save({ session: sess });
      sess.commitTransaction();
    } catch (error) {
      return next(
        new HttpError(
          "Une Erreur Inconnu s'est produite, impossible de vérifier l'abonnement. Veuillez réessayer ultérieurement!"
        )
      );
    }
  }
};
