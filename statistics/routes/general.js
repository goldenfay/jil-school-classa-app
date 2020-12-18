const router = require("express").Router();
const generalController = require("../controllers/general");

router.get("/counts", generalController.getCounts);



module.exports = router;
