var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/all', function(req, res, next) {
  res.status(200).send(GLOBAL.sessions);
});


module.exports = router;
