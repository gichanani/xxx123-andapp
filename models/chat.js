const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

//Chat Schema
const ChatSchema = mongoose.Schema({
  Interaction: {
    type: ObjectId,
    ref: 'Clients'
  },
  timestamps: true
});

const Chat = module.exports = mongoose.model('Chat', ChatSchema);
