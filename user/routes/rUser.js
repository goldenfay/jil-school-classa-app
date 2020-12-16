const router = require("express").Router();

const clientsRoutes = require("./rClients");
const elevesRoutes = require("./rEleves");
const classesRoutes = require("./rClasses");
const matieresRoutes = require("./rMatieres");
const abonnementsRoutes = require("./rAbonnements");
const coursRoutes = require("./rCours");
const pubsRoutes = require("./rPubs");
// const codesAbonnementsRoutes = require("./rCodesAbonnements");

router.use("/classes", classesRoutes);
router.use("/matieres", matieresRoutes);
router.use("/clients", clientsRoutes);
router.use("/eleves", elevesRoutes);
router.use("/abonnements", abonnementsRoutes);
router.use("/cours", coursRoutes);
router.use("/pubs", pubsRoutes);
// router.use("/codes_abonnements", classesRoutes);

module.exports = router;
