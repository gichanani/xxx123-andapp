const express = require('express');
const router = express.Router();

let User = require('../models/user');

router.get('/', function(req, res, next){
  res.render('pages/index');
  //res.send(JSON.stringify({ a: 1 }));
});

module.exports = router;
