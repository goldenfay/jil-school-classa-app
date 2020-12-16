const router = require("express").Router();
const { check } = require("express-validator");
const enseignantsRouter = require("./rEnseignants");
const updateAdmin = require("../middlewares/update-admin");
const signinAdmin = require("../middlewares/signin-admin");
const checkAuthAdmin = require("../middlewares/check-auth-admin");
const UploadMiddlware = require("../../shared/middlewares/multer-middlewares");
router.post(
  "/signin",
  [
    check("username").not().isEmpty(),
    check("password").isLength({ min: 6 }),
    check("type").isIn(["enseignant", "manager"]),
  ],
  signinAdmin
);

router.use(UploadMiddlware.ensAvatarsMildware().single("image"));
router.use(checkAuthAdmin);
router.put(
  "/:id",
  updateAdmin
);
router.use("/enseignants", enseignantsRouter);

module.exports = router;
