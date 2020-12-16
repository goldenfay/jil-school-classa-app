const multer = require("multer");
const path = require("path");

const multerInstance = (destFolder, fileNamingFcn, allowedMimeTypes) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destFolder);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${fileNamingFcn()}.${ext}`);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.indexOf(file.mimetype) !== -1) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({ storage: storage, fileFilter: fileFilter });

  return upload;
};

module.exports = multerInstance;
