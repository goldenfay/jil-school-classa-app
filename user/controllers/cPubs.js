const HttpError = require("../../shared/models/http-error");
const Pub = require("../models/pub");
const parseToPublicURL = require("../../shared/utils/parse-public-url");
const previewAd = async (req, res, next) => {
  let pub;
  try {
    pub = await Pub.findById(req.params.pubId);
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de récupérer l'annonce. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }

  res.status(200).json({ image: parseToPublicURL(pub.image), link: pub.link });
};

const getAllPubs = async (req, res, next) => {
  if (!req.adminData || req.headers.admintype !== "manager") {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Vous n'êtes pas autorisés à effectuer cette tâche",
        403
      )
    );
  }

  let pubs;
  try {
    pubs = await Pub.find({});
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de récupérer l'annonce. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }

  const response = pubs.map((pub) => ({
    ...pub.toObject({ getters: true }),
    image: parseToPublicURL(pub.image),
  }));

  res.status(200).json({ pubs: response });
};

const addPub = async (req, res, next) => {
  if (!req.adminData || req.body.adminType !== "manager") {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Vous n'êtes pas autorisés à effectuer cette tâche",
        403
      )
    );
  }
  const raquiredParams = ["sponsor", "titre", "type"];
  const keys = Object.keys(req.body);
  if (!raquiredParams.every((key) => keys.includes(key)) || !req.file) {
    return next(
      new HttpError(
        "Une Erreur s'est produite,Les paramètres envoyés ne sont pas valides",
        422
      )
    );
  }
  const { sponsor, titre, type, link } = req.body;
  const image = `${req.file.destination}/${req.file.filename}`;
  const newAd = new Pub({
    sponsor,
    titre,
    type,
    image,
    link,
  });

  try {
    await newAd.save();
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible d'ajouter la publicité. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  res.status(200).json({
    message: "Publicité ajoutée avec succès",
  });
};

const updatePub = async (req, res, next) => {
  if (!req.adminData || req.body.adminType !== "manager") {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Vous n'êtes pas autorisés à effectuer cette tâche",
        403
      )
    );
  }
  let pub;
  try {
    pub = await Pub.findById(req.params.pubId);
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de récupérer l'annonce. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  if (!pub)
    return next(
      new HttpError("Une Erreur s'est produite, La publicté est inexistante"),
      404
    );

  const { sponsor, titre, type, link } = req.body;
  let image;
  if (req.file) image = `${req.file.destination}/${req.file.filename}`;

  if (sponsor && sponsor !== null && sponsor !== "") pub.sponsor = sponsor;
  if (titre && titre !== null && titre !== "") pub.titre = titre;
  if (type) pub.type = type;
  if (image && image !== null && image !== "") pub.image = image;
  if (link && link !== null && link !== "") pub.link = link;

  let savedPub;
  try {
    savedPub = await pub.save();
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de mettre à jours la publicité. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  const response = savedPub.toObject({ getters: true });
  response.image = parseToPublicURL(response.image);
  res.status(200).json({
    message: "Publicité mise à jours avec succès",
    pub: response,
  });
};

const deletePub = async (req, res, next) => {
  if (!req.adminData || req.body.adminType !== "manager") {
    return next(
      new HttpError(
        "Une Erreur s'est produite, Vous n'êtes pas autorisés à effectuer cette tâche",
        403
      )
    );
  }
  let pub;
  try {
    pub = await Pub.findById(req.params.pubId);
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de récupérer l'annonce. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  if (!pub)
    return next(
      new HttpError(
        "Une Erreur s'est produite, L'identifiant de la publicité est inexistant"
      ),
      404
    );

  try {
    await Pub.deleteOne({ _id: req.params.pubId });
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible desupprimer la publicité. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  res.status(200).json({
    message: "Publicité supprimée avec succès",
  });
};


const getCountBySponsor = async (req, res, next) => {
  

  let pubs;
  try {
    pubs = await Pub.aggregate([
      {
        $group: {
          _id: "$sponsor",
          count: { $sum: 1 },
          avg: { $avg: 1 },
        },
      },
      
    ]);
  } catch (error) {
    console.log("Error: Could not aggregate eleves counts : ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, Impossible d'effectuer les calculs'",
        500
      )
    );
  }

  res
    .status(200)
    // .json({ results: pubs.map((c) => c.toObject({ getters: true })) });
    .json(pubs);
};

exports.previewAd = previewAd;
exports.getAllPubs = getAllPubs;
exports.addPub = addPub;
exports.updatePub = updatePub;
exports.deletePub = deletePub;




exports.getCountBySponsor = getCountBySponsor;


