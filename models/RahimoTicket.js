const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isResolvable } = require("@hapi/joi/lib/common");

const rahimoTicketSchema = new mongoose.Schema({
  depart: {
    type: String,
    required: true,
  },
  arrive: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    require: true,
  },
  prix: {
    type: String,
    required: true,
  },
  nombreTicket: {
    type: String,
    required: true,
  },
  usersId: {
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

module.exports = mongoose.model("RahimoTicket", rahimoTicketSchema);
