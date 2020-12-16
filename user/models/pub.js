const mongoose = require("mongoose");

const pubSchema = new mongoose.Schema({
  sponsor: {
    type: String,
    required: true,
  },
  titre: {
    type: String,
    required: true,
    minLength: 6,
  },
  type: {
    type: Number,
    required: true,
    enum: [1,2,3]
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  
}, {autoCreate: true});
module.exports = mongoose.model("Pub", pubSchema);
