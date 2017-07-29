const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

//Interaction Schema
const InteractionSchema = mongoose.Schema({
  client: {
    type: ObjectId,
    ref: 'Clients'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  start_time:{
    type: Date,
    required: true
  },
  end_time:{
    type: Date,
    default:''
  },
  timestamps: true
});

const Interaction = module.exports = mongoose.model('Interaction', InteractionSchema);
