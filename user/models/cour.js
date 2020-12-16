const mongoose = require("mongoose");

const courSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  classe: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Classe",
  },
  trimestre: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
  matiere: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Matiere",
  },
  ordre: {
    type: Number,
    required: true,
  },
  date_ajout: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  enseignant: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Enseignant",
  },
  video: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
  titrePdf: {
    type: String,
    required: true,
  },
  quiz: [
    {
      type: mongoose.Types.ObjectId,
      // required: true,
      ref: "CarteQuiz",
    },
  ],
}, {autoCreate: true});

module.exports = mongoose.model("Cour", courSchema);
