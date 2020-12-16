const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://petcivilufu.com.br/assets/base/img/content/team/team16.jpg",
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    validate: /^0[5679]\d{8}$/i,
  },
}, {autoCreate: true});

module.exports = mongoose.model("Manager", managerSchema);
