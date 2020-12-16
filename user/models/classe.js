const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const classeSchema = new mongoose.Schema({
  codeCl: {
    type: String,
    required: true,
    unique: true,
    immmutable: true,
  },
  cycle: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
    immutable: true,
  },
  annee: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    immutable: true,
  },
  filiere: {
    type: String,
    default: '',
    immutable: true,
  },
  matieres: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Matiere",
    },
  ],
}, {autoCreate: true});

classeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Classe", classeSchema);
