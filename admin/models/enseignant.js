const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const enseignantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  matiere: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Matiere",
  },
  classes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Classe",
      },
    ],
  },
  wilaya: {
    type: String,
    required: true,
  },
  commune: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    validate: /^0[5679]\d{8}$/i,
  },
  image: {
    type: String,
    default:
      "https://petcivilufu.com.br/assets/base/img/content/team/team16.jpg",
  },
  date_ajout: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  cours: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cour",
    },
  ],
}, {autoCreate: true} );

enseignantSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Enseignant", enseignantSchema);
