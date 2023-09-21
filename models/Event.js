const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { isResolvable } = require("@hapi/joi/lib/common");


const eventSchema = new mongoose.Schema({
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
    required: true
  },
  date: {
    type: String,
    required: true
  },
  heure: {
    type: String,
    required: true
  },
  prixStandart: {
    type: String,
    required: true
  },
  nombreTicketStandart: {
    type: String,
    required: true
  },
  prixVip: {
    type: String,
    required: true
  },
  nombreTicketVip: {
    type: String,
    required: true
  },
  nomLieu: {
    type: String,
    required: true
  },
  descriptionLieu: {
    type: String,
    required: true
  },
  artisteInviter1: {
    type: String
  },
  artisteInviter2: {
    type: String
  },
  artisteInviter3: {
    type: String
  },
  artisteInviter4: {
    type: String
  },
created_at: {
  type: Date,
  default: Date.now
},
updated_at: {
  type: Date,
  default: Date.now
 }
});



module.exports = mongoose.model("Event", eventSchema);