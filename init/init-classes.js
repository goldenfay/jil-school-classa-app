const HttpError = require("../shared/models/http-error");
const Classe = require("../user/models/classe");
const Matiere = require("../user/models/matiere");
const classesDB = require("./DB/classes");
var shell = require("shelljs");



const classesPaths=[
  "uploads/user/classes",
  "uploads/user/classes/primaire",
  "uploads/user/classes/CEM",
  "uploads/user/classes/lycee",
]

const initClasses = async () => {
  try {
    // classesPaths.forEach((path) => {
    //   if (!fs.existsSync(path)) shell.mkdir("-p", path);
    // });
    for (var i = 0; i < classesDB.length; i++) {
      let classe = classesDB[i];

        // Create directory for the classe
      const classDir=classesPaths[classe.cycle]+"/"+classe.codeCl
      // if (!fs.existsSync(classDir)) shell.mkdir("-p", classDir);


      let matieres = [];
      for (var j = 0; j < classe.matieres.length; j++) {
        let matiere = await Matiere.findOne({
          titre: new RegExp(["^", classe.matieres[j], "$"].join(""), "i"),
        });
        if (!matiere) {
          return new HttpError(
            `Une erreur s'est produite lors de l'initialisation des classes. Une des matières de ${classe.codeCl} n'existe pas`,
            500
          );
        }
        const matiereDir=classDir+"/"+matiere.titre
        // if (!fs.existsSync(matiereDir)) shell.mkdir("-p", matiereDir);


        matieres.push(matiere);
      }
      classe.matieres = matieres;

      const newClasse = new Classe(classe);
      await newClasse.save();
    }
  } catch (error) {
    return new HttpError(
      "Une erreur s'est produite lors de l'initialisation des classes " + error,
      500
    );
  }

  return Promise.resolve({
    ok: true,
    message: "La base de données Classe est initialisée avec succès.",
  });
};

module.exports = initClasses;
