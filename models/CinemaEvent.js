const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isResolvable } = require("@hapi/joi/lib/common");

const cinemaEventSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  heure: {
    type: String,
    required: true,
  },
  prix: {
    type: String,
    required: true,
  },
  nombreTicket: {
    type: String,
    required: true,
  },
  nomLieu: {
    type: String,
    required: true,
  },
  descriptionLieu: {
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

module.exports = mongoose.model("CinemaEvent", cinemaEventSchema);
