const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
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
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
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
  .connect("mongodb://localhost:27017/classa", {
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
    console.log("Error Connection");
  });

// convention: db naming should be singular and starts with capital letter ==> mongoose.model("Matiere", matiereSchema) &&& ref:"Matiere"

// Status Code
// 401 : Authorization error
// 403 : this is forbidden in general which can be translated to you're not authenticated at all (like signin error, signup error)
// 404 : Not Found
// 422 : Invalid user input
// 500 : Something went wrong on the server
// 200 : it's a normal success
// 201 : it's a particular success for when you create something new

// Environment Variable:
// bcrypt process.env.HASH_SALT: 12
// jwt admin_secret_key: process.env.ADMIN_SECRET
// jwt user_secret_key: process.env.USER_SECRET

/*



Admin Collections 
-------------------

token Manager: 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjM5Y2VlZmY1NTFjMzhlOTUyOTRhMiIsImlhdCI6MTYwNTYwNjY5MX0.HINqrQdNe8jDeTTU4EPISbQ2iMzbFwWOpXhm05VdCu0


Riad Manager account
username: riad
Password: riadclassa2020__
Bcrypt hash : $2a$12$Ns10pMlYGjkTqbH.5X0tNeiSip6iYlf6kVZYXP13nRhHapBJz69oG

db.managers.insertOne(
  {username: "riad",password: "$2a$12$Ns10pMlYGjkTqbH.5X0tNeiSip6iYlf6kVZYXP13nRhHapBJz69oG", nom:"Djaafer", prenom:"Riad", image:"https://petcivilufu.com.br/assets/base/img/content/team/team16.jpg"})


Token Enseignants



*/
