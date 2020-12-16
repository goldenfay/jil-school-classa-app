const router = require("express").Router();
const checkAuthShared = require("../middlewares/check-auth-shared");
const classesController = require("../controllers/cClasses");

router.get("/", checkAuthShared, classesController.getClasses);
router.get("/matieres", checkAuthShared, classesController.getClassesWithMatieres);
router.get("/matieres/:classeId", checkAuthShared, classesController.getOneClasseMatieres);
router.post("/init", checkAuthShared, classesController.initDatabase);

module.exports = router;
