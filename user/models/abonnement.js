const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const abonnementSchema = new mongoose.Schema({
  code_achat: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["1pri", "1cem", "1lyc", "3cls"],
    required: true,
  },
  date_debut: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  date_fin: {
    type: Date,
    required: true,
  },
  duree: {
    type: Number,
    required: true,
  },
  classes: {type: [{
    type: mongoose.Types.ObjectId,
    ref: "Classe",
  }],required: true},
  is_abonne: {
    type: Boolean,
    required: true,
  },
  client: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Client",
  },
}, {autoCreate: true});

abonnementSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Abonnement", abonnementSchema,"abonnements");
