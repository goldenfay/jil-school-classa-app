// const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');


app.use(bodyParser.json());

const corsConfig = function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept,Authorization"
  );
  next();
};

app.use(corsConfig);
app.use(fileUpload());

const apiRoutes = require("./routes");
app.use("/", apiRoutes);

var server = app.listen(port, () =>
  console.log(
    `Server is listening from : ${server.address().address}  on port ${
      server.address().port
    }!`
  )
);

