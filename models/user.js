const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
  first_name: {
      type: String,
      default:''
  },
  surname: {
      type: String,
      default:''
  },
  last_name: {
      type: String,
      default:''
  },
  username:{
      type:String,
      unique: true,
      required: true
  },
  national_id: {
    type: Number,
    default: ''
  },
  passport: {
    type:String,
    default: ''
  },
  email: {
    type: String,
    unique:true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  gender:{
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('MainUser', UserSchema);
