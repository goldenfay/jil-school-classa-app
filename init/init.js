const mongoose = require("mongoose");
const DBIntializer = require("./index");


const action = 1;

mongoose
  .connect('mongodb+srv://classa:<password>@cluster0.maax4.mongodb.net/<dbname>?retryWrites=true&w=majority', {
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
