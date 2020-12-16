const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const rapportConnectionSchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  device: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Client",
  },
  eleve: {
    type: mongoose.Types.ObjectId,
    ref: "Eleve",
    required: false,
  },
}, {autoCreate: true});

rapportConnectionSchema.plugin(uniqueValidator);

module.exports = mongoose.model(
  "RapportConnection",
  rapportConnectionSchema,
  "rapports_connections"
);
