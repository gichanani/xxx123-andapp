const express = require('express');
const router = express.Router();

let User = require('../models/user');

router.get('/', function(req, res, next){
  res.render('pages/settings/index',{

  });
});

module.exports = router;
 
