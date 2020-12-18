const router = require("express").Router();
const elevesStatisticsController = require("../controllers/eleves-related");
const checkAuthAdmin = require("../../admin/middlewares/check-auth-admin");

router.get("/countByCyle", checkAuthAdmin, elevesStatisticsController.getCountByClasse);
router.get("/countByClasse", checkAuthAdmin, elevesStatisticsController.getCountByClasse);
router.get("/countByAge", checkAuthAdmin, elevesStatisticsController.getCountByClasse);
router.get("/summary", checkAuthAdmin, elevesStatisticsController.getCountsSummary);


module.exports = router;
