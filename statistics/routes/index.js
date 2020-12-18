const router = require("express").Router();
const elevesStatisticsRouter = require("./eleves-related");
const profsStatisticsRouter = require("./profs-related");

router.use("/eleves", elevesStatisticsRouter);
router.use("/enseignants", profsStatisticsRouter);

module.exports = router;
