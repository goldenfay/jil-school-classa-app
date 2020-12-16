const HttpError = require("../../shared/models/http-error");
const Cours = require("../models/cour");
const CarteQuiz = require("../models/carteQuiz");
const Enseignant = require("../../admin/models/enseignant");
const parseToPublicURL = require("../../shared/utils/parse-public-url");

const createCours = async (req, res, next) => {
  const { adminType } = req.body;
  if (adminType !== "enseignant")
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action", 403)
    );

  const {
    titre,
    classe,
    trimestre,
    matiere,
    ordre,
    enseignant,
    video,
    titrePdf,
  } = req.body;
  const questionsList = JSON.parse(req.body.questionsList);
  const pdf = req.files.pdf && req.files.pdf.length && req.files.pdf[0];
  const imgsQuestions = req.files.cartesQuestions;
  const imgsAnswers = req.files.cartesAnswers;
  let enseignantRecord;
  try {
    enseignantRecord = await Enseignant.findById(enseignant);
  } catch (error) {
    console.log("Error occured while inserting new cours : ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible d'ajouter le cours. Veuillez réessayer ulterieurement",
        500
      )
    );
  }
  if (!enseignantRecord)
    return next(
      new HttpError(
        "Une Erreur s'est produite,L'enseignant est introuvable. Veuillez réessayer ulterieurement",
        500
      )
    );
  const newCours = new Cours({
    titre,
    classe,
    trimestre,
    matiere,
    ordre,
    enseignant,
    video,
    titrePdf,
    pdf: `${pdf.destination}/${pdf.filename}`,
  });
  let savedCours;
  try {
    savedCours = await newCours.save();
  } catch (error) {
    console.log("Error occured while inserting new cours : ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible d'ajouter le cours. Veuillez réessayer ulterieurement",
        500
      )
    );
  }
  const savedCartesQuiz = [];
  for (var index = 0; index < questionsList.length; index++) {
    let savedQstImg = null,
      savedAnswerImg = null;
    let question = questionsList[index];

    if (question.questionImgName && question.questionImgName !== null) {
      savedQstImg = imgsQuestions.find(
        (savedFile) => savedFile.originalname === question.questionImgName
      );
    }
    if (question.answerImgName && question.answerImgName !== null)
      savedAnswerImg = imgsAnswers.find(
        (savedFile) => savedFile.originalname === question.answerImgName
      );
    const newQuizCard = new CarteQuiz({
      question_text: question.questionText,
      question_image:
        savedQstImg !== null
          ? `${savedQstImg.destination}/${savedQstImg.filename}`
          : null,
      reponse_text: question.answerText,
      reponse_image:
        savedAnswerImg !== null
          ? `${savedAnswerImg.destination}/${savedAnswerImg.filename}`
          : null,
      ordre: index + 1,
      cours: savedCours,
    });
    let savedCard;
    try {
      savedCard = await newQuizCard.save();
      savedCartesQuiz.push(savedCard._id);
    } catch (error) {
      console.log("Error occured while inserting carte quiZ : ", error);
      return next(
        new HttpError(
          "Une Erreur s'est produite, impossible d'ajouter le cours. Veuillez réessayer ulterieurement",
          500
        )
      );
    }
  }
  savedCours.quiz = savedCartesQuiz;
  let updatedCours;
  try {
    updatedCours = await savedCours.save();
    enseignantRecord.cours = [...enseignantRecord.cours, updatedCours];
    await enseignantRecord.save();
  } catch (error) {
    console.log("Error occured while affecting cours to prof: ", error);
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible d'ajouter le cours. Veuillez réessayer ulterieurement",
        500
      )
    );
  }

  return res
    .status(200)
    .json({ ok: true, newCours: updatedCours.toObject({ getters: true }) });
};

const deleteCours = async (req, res, next) => {
  if (!req.adminData) {
    return next(
      new HttpError(
        "Vous n'êtes pas autorisés à effectuer cette opération",
        403
      )
    );
  }
  const { adminType } = req.body;
  if (adminType !== "enseignant")
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action", 403)
    );

  const { coursId } = req.params;
  if (!coursId)
    return next(new HttpError("Paramètres invalides. Cours non spécifié", 422));
  let cours;
  try {
    await Cours.findByIdAndDelete(coursId);
    res
    .status(200)
    .json({ ok: true, message: "Cours supprimé avec succès" });


  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de supprimer ce cours. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
};

const getMatiereCoursesIndex = async (req, res, next) => {
  if (!req.userData) {
    return next(
      new HttpError(
        "Vous n'êtes pas autorisés à effectuer cette opération",
        403
      )
    );
  }
  const { usertype } = req.headers;
  if (usertype !== "eleve")
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action", 403)
    );

  const { matiereId } = req.params;
  const { classeId } = req.params;
  if (!matiereId || !classeId)
    return next(
      new HttpError(
        "Vous n'êtes pas autorisés à effectuer cette opération",
        403
      )
    );

  let courses;
  try {
    courses = await Cours.find({ matiere: matiereId, classe: classeId })
      .select("titre video ordre date_ajout")
      .sort({ ordre: 1 });
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver les cours de cet matière. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  
  
  res
    .status(200)
    .json({ courses: courses.map((c) => c.toObject({ getters: true })) });
};

const getMatierePDFS = async (req, res, next) => {
  if (!req.userData) {
    return next(
      new HttpError(
        "Vous n'êtes pas autorisés à effectuer cette opération",
        403
      )
    );
  }
  const { usertype } = req.headers;
  if (usertype !== "eleve")
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action", 403)
    );

  const { matiereId } = req.params;
  const { classeId } = req.params;
  if (!matiereId || !classeId)
    return next(
      new HttpError(
        "Vous n'êtes pas autorisés à effectuer cette opération",
        403
      )
    );

  let courses;
  try {
    courses = await Cours.find({ matiere: matiereId, classe: classeId })
      .select("titre pdf titrePdf ordre date_ajout")
      .sort({ ordre: 1 });
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver les cours de cet matière. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }

  const responseObj =courses.map((c) => c.toObject({ getters: true })).map(cours=>({
    ...cours,
    pdf: parseToPublicURL(cours.pdf)
  }));
  res
    .status(200)
    .json({ courses:  responseObj});
};

const getMatiereQuizs = async (req, res, next) => {
  if (!req.userData) {
    return next(
      new HttpError(
        "Vous n'êtes pas autorisés à effectuer cette opération",
        403
      )
    );
  }
  const { usertype } = req.headers;
  if (usertype !== "eleve")
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action", 403)
    );

  const { matiereId } = req.params;
  const { classeId } = req.params;
  if (!matiereId || !classeId)
    return next(
      new HttpError(
        "Vous n'êtes pas autorisés à effectuer cette opération",
        403
      )
    );

  let courses;
  try {
    courses = await Cours.find({ matiere: matiereId, classe: classeId })
      .select("titre ordre date_ajout")
      .populate("quiz")
      .sort({ ordre: 1 });
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver les cours de cet matière. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }

  const responseObj =courses.map((c) => c.toObject({ getters: true })).map(cours=>({
    ...cours,
    quiz: cours.quiz.map(qst=>({
      ...qst,
      question_image: qst.question_image!==null?parseToPublicURL(qst.question_image):qst.question_image,
      reponse_image: qst.reponse_image!==null?parseToPublicURL(qst.reponse_image):qst.reponse_image
    }))
  }));

  res
    .status(200)
    .json({ courses: responseObj });
};

const getProfCourses = async (req, res, next) => {
  if (!req.adminData) {
    return next(
      new HttpError(
        "Vous n'êtes pas autorisés à effectuer cette opération",
        403
      )
    );
  }
  const { admintype } = req.headers;
  if (admintype !== "enseignant")
    return next(
      new HttpError("Vous n'êtes pas autorisés à effectuer cette action", 403)
    );

  const { profId } = req.params;
  if (!profId)
    return next(
      new HttpError(
        "Vous n'êtes pas autorisés à effectuer cette opération",
        403
      )
    );

  let courses;
  try {
    courses = await Cours.find({ enseignant: profId }).sort({ ordre: 1 });
  } catch (error) {
    return next(
      new HttpError(
        "Une Erreur s'est produite, impossible de trouver les cours de cet enseignant. Veuillez réessayer ulterieurement"
      ),
      500
    );
  }
  res
    .status(200)
    .json({ courses: courses.map((c) => c.toObject({ getters: true })) });
};
exports.createCours = createCours;
exports.deleteCours = deleteCours;
exports.getProfCourses = getProfCourses;
exports.getMatiereCoursesIndex = getMatiereCoursesIndex;
exports.getMatierePDFS = getMatierePDFS;
exports.getMatiereQuizs = getMatiereQuizs;
