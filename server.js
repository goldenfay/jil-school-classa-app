const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const URI =require('./config');
const adminRoutes = require("./admin/routes/rAdmin");
const userRoutes = require("./user/routes/rUser");
const multer = require("multer");

const PORT = 5000;

const recontructBody = function (req, res, next) {
  multer().any(req, res, next);
  next();
};
server.use(recontructBody);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static("uploads"));

const corsConfig = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept,Authorization,adminType,userType"
  );
  next();
};
server.use(corsConfig);

server.use("/api/admin", adminRoutes);
server.use("/api/user", userRoutes);
server.use("/api/statistics", statisticsRoutes);

// Pour les erreurs qui n'ont pas été traités
server.use((error, req, res, next) => {
  if (res.sentHeader) {
    return next(error);
  } else {
    res.status(error.code || 500).json({
      message: error.message || "Une Erreur inconnu s'est produite!",
    });
  }
});

server.use("/", (req, res, next) => {
  res.status(403).json({
    isActive: false,
    isSubbed: false,
  });
});

mongoose
  .connect( URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // retryWrites:false
  })
  .then((p) => {
    const app = server.listen(process.env.PORT || PORT, () => {
      const serve = {
        address:
          app.address().address === "::"
            ? "http://localhost"
            : app.address().address,
        port: app.address().port,
      };
      process.env["SERVER"] = JSON.stringify(serve);
      console.log("Connected to mongodb");
      console.log(`Server Running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error Connection",err);
  });

