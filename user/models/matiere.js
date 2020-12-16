const mongoose = require("mongoose");

const matiereSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  titreAr: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
}, {autoCreate: true});

module.exports = mongoose.model("Matiere", matiereSchema);
