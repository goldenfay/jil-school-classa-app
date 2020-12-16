const router = require("express").Router();
const pubsController = require("../controllers/cPubs");
const checkAuthShared = require("../middlewares/check-auth-shared");
const checkAuthAdmin = require("../../admin/middlewares/check-auth-admin");
const UploadMiddlware = require("../../shared/middlewares/multer-middlewares");

router.get("/view/:pubId", checkAuthShared, pubsController.previewAd);
router.get("/", checkAuthAdmin, pubsController.getAllPubs);
router.delete("/:pubId", checkAuthAdmin, pubsController.deletePub);
router.put("/:pubId",UploadMiddlware.multerForPubsImgs().single('image'), checkAuthAdmin,  pubsController.updatePub);
router.post("/new", UploadMiddlware.multerForPubsImgs().single('image'),checkAuthAdmin,  pubsController.addPub);

module.exports = router;
