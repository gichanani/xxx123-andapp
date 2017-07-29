const express = require('express');
const router = express.Router();

let User = require('../models/user');

router.get('/', function(req, res, next){
  res.render('pages/index');
  //res.send(JSON.stringify({ a: 1 }));
});

//login Form
router.get('/login', function(req, res){
  res.render('pages/users/login');
});

module.exports = router;
