const router = require("express").Router();
const matieresController = require("../controllers/cMatieres");
const checkAuthShared = require("../middlewares/check-auth-shared");
const checkAuthAdmin = require("../../admin/middlewares/check-auth-admin");

router.get("/", checkAuthShared, matieresController.getMatieres);
router.get("/new", checkAuthAdmin, matieresController.addMatiere);
router.post("/init", checkAuthAdmin, matieresController.initDatabase);

module.exports = router;
