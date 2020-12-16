const router = require("express").Router();
const checkAuthUser = require("../middlewares/check-auth-user");
const checkAuthAdmin = require("../../admin/middlewares/check-auth-admin");
const abonnementController = require("../controllers/cAbonnements");


router.get("/", checkAuthAdmin,abonnementController.getAllAbonnements);
// router.use(checkAuthUser);
router.post("/new", checkAuthUser,abonnementController.createAbonnement);

module.exports = router;
