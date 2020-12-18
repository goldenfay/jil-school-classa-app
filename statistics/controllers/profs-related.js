const Enseignant = require("../../admin/models/enseignant");
const Classe = require("../../user/models/classe");
const HttpError = require("../../shared/models/http-error");
const Manager = require("../../admin/models/manager");

const getCountsSummary = async (req, res, next) => {
  const managerId = req.adminData.id;
  let manager;
  try {
    manager = await Manager.findById(managerId);
  } catch (error) {
    return next(
      new HttpError(
        "Une erreur s'est produite, Impossible d'effectuer les calculs",
        500
      )
    );
  }

  if (!manager) {
    return next(
      new HttpError("Vous n'avez pas le droit de faire cette opération", 401)
    );
  }

  let profsByWilaya;
  try {
    profsByWilaya = await Enseignant.aggregate([
      {
        $group: {
          _id: "$wilaya",
          count: { $sum: 1 },
        },
      }
   
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

  let classesByprof;
  try {
    classesByprof = await Enseignant.find({});
    classesByprof=classesByprof.map(profRow=>({
      nom:profRow.nom, prenom: profRow.prenom, count: profRow.classes.length
    }))
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
    .json({ profsByWilaya, classesByprof
  });
};


exports.getCountsSummary = getCountsSummary;
