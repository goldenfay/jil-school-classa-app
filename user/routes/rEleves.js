const router = require("express").Router();
const elevesController = require("../controllers/cEleves");
const checkAuthShared = require("../middlewares/check-auth-shared");
const checkAuthUser = require("../middlewares/check-auth-user");
const checkAdminAuth = require("../../admin/middlewares/check-auth-admin");


router.get("/", checkAdminAuth, elevesController.getAllEleves);
router.get("/classe/:classeId", checkAuthShared, elevesController.getClasseEleves);
router.get("/enseignants/:ensId", checkAdminAuth, elevesController.getElevesByEnsClasses);
router.get("/clients/:clientId", checkAuthUser, elevesController.getElevesByClientId);
router.post("/signin", checkAuthUser, elevesController.signinEleve);
router.post("/logout", checkAuthUser, elevesController.logoutEleve);

module.exports = router;
