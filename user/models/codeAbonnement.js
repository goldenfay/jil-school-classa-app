const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const codeAbonnementSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["1pri", "1cem", "1lyc", "3cls"],
  },
  is_taken: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {autoCreate: true});

codeAbonnementSchema.plugin(uniqueValidator);

module.exports = mongoose.model(
  "CodeAbonnement",
  codeAbonnementSchema,
  "codes_abonnements"
);
