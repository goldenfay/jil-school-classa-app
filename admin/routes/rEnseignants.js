const router = require("express").Router();
const { check } = require("express-validator");
const checkAuthAdmin = require("../middlewares/check-auth-admin");

const controllerEnseignant = require("../controllers/cEnseignants");

router.use(checkAuthAdmin);
router.get("/:id", controllerEnseignant.getEnseignantById);
router.get("/", controllerEnseignant.getEnseignants);
router.post(
  "/new",
  [
    check("password").isLength(
      { min: 6 },
      check("email").isEmail(),
      check("username").not().isEmpty()
    ),
  ],
  controllerEnseignant.addEnseignant
);

module.exports = router;
