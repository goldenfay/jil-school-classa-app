const router = require("express").Router();
const profsStatisticsController = require("../controllers/profs-related");
const checkAuthAdmin = require("../../admin/middlewares/check-auth-admin");

router.get("/summary", checkAuthAdmin, profsStatisticsController.getCountsSummary);



module.exports = router;
