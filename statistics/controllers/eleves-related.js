const Eleve = require("../../user/models/eleve");
const Classe = require("../../user/models/classe");
const HttpError = require("../../shared/models/http-error");
const Manager = require("../../admin/models/manager");

const getCountByCycle = async (req, res, next) => {
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
  

  let eleves;
  try {
    eleves = await Eleve.aggregate([
      {
        $group: {
          _id: "$classe.cycle",
          count: { $sum: 1 },
          avg: { $avg: 1 },
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "classe",
          foreignField: "_id",
          as: "classe",
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

  res
    .status(200)
    .json({ results: eleves.map((c) => c.toObject({ getters: true })) });
};

const getCountByClasse = async (req, res, next) => {
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

  let eleves;
  try {
    eleves = await Eleve.aggregate([
      {
        $group: {
          _id: "$classe.codeCl",
          count: { $sum: 1 },
          avg: { $avg: 1 },
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "classe",
          foreignField: "_id",
          as: "classe",
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
    .json({ results: eleves.map((c) => c.toObject({ getters: true })) });
};

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

  let elevesByClasse;
  try {
    elevesByClasse = await Eleve.aggregate([
      {
        $group: {
          _id: "$classe.codeCl",
          count: { $sum: 1 },
          avg: { $avg: 1 },
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "classe",
          foreignField: "_id",
          as: "classe",
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


  let elevesByCycle;
  try {
    elevesByCycle = await Eleve.aggregate([
      {
        $group: {
          _id: "$classe.cycle",
          count: { $sum: 1 },
          avg: { $avg: 1 },
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "classe",
          foreignField: "_id",
          as: "classe",
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
  let elevesByAge;
  try {
    elevesByAge = await Eleve.aggregate([
      {
        $group: {
          _id: "$age",
          count: { $sum: 1 },
          avg: { $avg: 1 },
        }
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

  let elevesBySexe;
  try {
    elevesBySexe = await Eleve.aggregate([
      {
        $group: {
          _id: "$sexe",
          count: { $sum: 1 },
          avg: { $avg: 1 },
        }
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

  res
    .status(200)
    .json({ 

      elevesByCycle,elevesByClasse, elevesByAge,elevesBySexe
  });
};

exports.getCountByCycle = getCountByCycle;
exports.getCountByClasse = getCountByClasse;
exports.getCountsSummary = getCountsSummary;
