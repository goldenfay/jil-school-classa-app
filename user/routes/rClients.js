const router = require("express").Router();
const checkAdminAuth = require("../../admin/middlewares/check-auth-admin");

const clientsController = require("../controllers/cClients");

router.post("/signin",clientsController.preSignin, clientsController.signin);
router.post("/signup", clientsController.signup);
router.get("/", checkAdminAuth,clientsController.getClients);

module.exports = router;
