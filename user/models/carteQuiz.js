const mongoose = require("mongoose");

const carteQuizSchema = new mongoose.Schema({
  question_text: String,
  question_image: String,
  reponse_text: String,
  reponse_image: String,
  ordre: {
    type: Number,
    required: true,
  },
  cours: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Cour",
  },
}, {autoCreate: true});

module.exports = mongoose.model("CarteQuiz", carteQuizSchema, "cartes_quiz");
