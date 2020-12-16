const { v4: uuidv4 } = require("uuid");
const multerInstance = require("./multer");
const fs = require("fs");
var shell = require("shelljs");
const { base } = require("../../user/models/pub");

const allowedImages = ["image/jpeg", "image/jpg", "images/gif", "image/png"];
const allowedResumes = ["application/pdf"];
const allowedCoursFields = allowedImages.concat(allowedResumes);

const baseDir = "uploads";
// Admins related paths
const profsAvatarsDir = baseDir + "/admin/enseignants/avatar";
const managersAvatarsDir = baseDir + "/admin/managers/avatar";
const pubsImgsDir = baseDir + "/admin/pubs";
// Users related paths
const usersAvatarsDir = baseDir + "/users/avatar";
const contentDir=baseDir + "user/classes"
const temporary = baseDir + "/temporary";

// Fill this array everytime a new upload dir is defined
const allPaths = [
  profsAvatarsDir,
  managersAvatarsDir,
  usersAvatarsDir,
  pubsImgsDir,
  contentDir,
  temporary,
];

// NOTE: THIS IS AN AUTO EXECUTED FUNCTION, EVERYTIME THE FILE IS LOADED, IT CHECKS THAT ALL PATH EXIST
const checkDirectories = (function analysePaths() {
  console.log("Checking uploads directories ...");
  allPaths.forEach((path) => {
    if (!fs.existsSync(path)) shell.mkdir("-p", path);
  });
  console.log("Check is done.");
})();

const fileNamingFcn = () => uuidv4();

const multerForEnsAvatars = () =>
  multerInstance(profsAvatarsDir, fileNamingFcn, allowedImages);
const multerForManagersAvatars = () =>
  multerInstance(managersAvatarsDir, fileNamingFcn, allowedImages);
const uploadCoursMulter = () =>
  multerInstance(temporary, fileNamingFcn, allowedCoursFields);
const multerForPubsImgs = () =>
  multerInstance(pubsImgsDir, fileNamingFcn, allowedImages);

exports.ensAvatarsMildware = multerForEnsAvatars;
exports.managersAvatarsMildware = multerForManagersAvatars;
exports.uploadCoursMulter = uploadCoursMulter;
exports.multerForPubsImgs = multerForPubsImgs;
