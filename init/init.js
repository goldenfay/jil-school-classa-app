const mongoose = require("mongoose");
const DBIntializer = require("./index");


const action = 4;

mongoose
  .connect("mongodb://localhost:27017/classa", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((p) => {

    switch (action) {
      case 1:
        DBIntializer.initializeMatieres().then(
          (res) => {
            if (res.ok) console.log("Opération réussie.");
          },
          (err) => {
            console.error("Initialisation échoué ! " + err);
          }
        );
        break;
      case 2:
        
        DBIntializer.initializeClasses().then(
          (res) => {
            if (res.ok) console.log("Opération réussie.");
          },
          (err) => {
            console.error("Initialisation échoué ! " + err);
          }
        );
        break;
      case 3:
        DBIntializer.initializeCodesAbonnements().then(
          (res) => {
            if (res.ok) console.log("Opération réussie.");
          },
          (err) => {
            console.error("Initialisation échoué ! " + err);
          }
        );
        break;
      case 4:
        DBIntializer.initializeManagers().then(
          (res) => {
            if (res.ok) console.log("Opération réussie.");


          },
          (err) => {
            console.error("Initialisation échoué ! " + err);
          }
        );
    }
  })
  .catch((err) => {
    console.log("Error Connection");
  });
