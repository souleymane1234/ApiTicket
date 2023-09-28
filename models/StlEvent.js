const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isResolvable } = require("@hapi/joi/lib/common");

const stlEventSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  depart: {
    type: String,
    required: true,
  },
  arrive: {
    type: String,
    required: true,
  },
  prix: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StlEvent", stlEventSchema);
