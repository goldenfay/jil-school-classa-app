const coursController = require("../controllers/cCours");
const router = require("express").Router();
const uploadMiddleware = require("../../shared/middlewares/multer-middlewares");
const checkAuthAdmin = require("../../admin/middlewares/check-auth-admin");
const checkAuthUser = require("../../user/middlewares/check-auth-user");
// call middleware check if it's teacher
// router.post("/new", fileUpload, coursController.createCours);

router.post(
  "/new",
  uploadMiddleware.uploadCoursMulter().fields([
    { name: "pdf", maxCount: 1 },
    { name: "cartesQuestions", maxCount: 30 },
    { name: "cartesAnswers", maxCount: 30 },
  ]),
  checkAuthAdmin,
  coursController.createCours
);
router.delete("/:coursId",checkAuthAdmin,coursController.deleteCours)
router.get("/enseignants/:profId",checkAuthAdmin,coursController.getProfCourses)

router.get("/classe/matiere/index/:classeId/:matiereId",checkAuthUser,coursController.getMatiereCoursesIndex)
router.get("/classe/matiere/pdfs/:classeId/:matiereId",checkAuthUser,coursController.getMatierePDFS)
router.get("/classe/matiere/quizs/:classeId/:matiereId",checkAuthUser,coursController.getMatiereQuizs)



module.exports = router;
