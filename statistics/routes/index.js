const router = require("express").Router();
const elevesStatisticsRouter = require("./eleves-related");
const profsStatisticsRouter = require("./profs-related");
const generalRouter = require("./general");

router.use("/eleves", elevesStatisticsRouter);
router.use("/enseignants", profsStatisticsRouter);
router.use("/", generalRouter);

module.exports = router;