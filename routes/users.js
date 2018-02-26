var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(req, res, next) {
  res.render('cool', {title: 'COOLIO'});
});

router.get('/indivisible', function(req, res, next) {
  res.render('indivisible', {title: 'United'});
});

module.exports = router;
