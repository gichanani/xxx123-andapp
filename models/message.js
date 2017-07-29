const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

//Message Schema
const MessageSchema = mongoose.Schema({
  chat: {
    type: ObjectId,
    ref: 'Chat'
  },
  interaction: {
    type: ObjectId,
    ref: 'Interaction'
  },
  timestamps: true
});

const Message = module.exports = mongoose.model('Message', MessageSchema);
