const router = require("express").Router();
const cCodesAbonnements = require("../controllers/cCodesAbonnements");
const checkAuthShared = require("../middlewares/check-auth-shared");

// router.get("/:id", checkAuthShared, cCodesAbonnements.getCodeAbonnementById);
router.post("/add_test_codes", cCodesAbonnement.addTestCodes);
router.put("/", checkAuthShared, cCodesAbonnements.achatCodeAbonnement);
