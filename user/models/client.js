const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
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
  is_abonne: {
    type: Boolean,
    required: true,
    default: false,
  },
  abonnement: {
    type: mongoose.Types.ObjectId,
    ref: "Abonnement",
  },
  eleves: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Eleve",
    },
  ],
  connections: [
    {
      type: mongoose.Types.ObjectId,
      ref: "RapportConnection",
    },
  ],
  limit_connection: {
    type: Number,
    default: null,
  },
  date_creation: {
    type: Date,
    default: Date.now(),
  },
}, {autoCreate: true});
module.exports = mongoose.model("Client", clientSchema,"clients");
