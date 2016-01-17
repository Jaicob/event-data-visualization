'use strict';

var express = require('express');
var router = express.Router();

/**
* Prefix:root Verb:GET URI:/ Controller: core.index
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
