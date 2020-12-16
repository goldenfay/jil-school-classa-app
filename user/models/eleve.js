const mongoose = require("mongoose");

const eleveSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  sexe: {
    type: String,
    enum: ["M", "F"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    default:
      "https://media.istockphoto.com/photos/student-going-to-school-and-waving-goodbye-picture-id1014544594",
  },
  client: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Client",
  },
  classe: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Classe",
  },
}, {autoCreate: true});

module.exports = mongoose.model("Eleve", eleveSchema, "eleves");
