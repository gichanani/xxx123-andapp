const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

//CSAgree Schema
const CSAgreeSchema = mongoose.Schema({
  interaction: {
    type: ObjectId,
    ref: 'Interaction'
  },
  type_of_good:{
    type: String,
    required: true
  },
  agreed_fee:{
    type: Number,
    required:true
  },
  start_location:{
    type: String,
    required: true
  },
  end_location: {
    type: String,
    required: true
  },
  timestamps: true
});

const CSAgree = module.exports = mongoose.model('CSAgree', CSAgreeSchema);
