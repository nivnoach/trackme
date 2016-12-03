var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('welcome');
});

router.get('/start', function(req, res, next) {
  var newSession = generateGuid()
  GLOBAL.sessions[newSession] = [];
  res.redirect('/' + newSession);
});

// report view
router.get('/:id', function(req, res, next) {
  if (!GLOBAL.sessions[req.params.id]) {
    return res.redirect('/');
  }
  
  res.render('report', { id: req.params.id });
});

// report endpoint
router.post('/:id/report', function(req, res, next) {
  if (!GLOBAL.sessions[req.params.id]) {
    return res.status(400).send("sorry, no such followee... :-/");
  }

  var pos = req.body;
  pos.timestamp = new Date();
  GLOBAL.sessions[req.params.id].unshift(pos);
  res.sendStatus(200);
});

// get view
router.get('/:id/follow', function(req, res, next) {
  if (!GLOBAL.sessions[req.params.id]) {
    return res.render('nosuchfollowee');
  }

  res.render('follow', { id: req.params.id });
});

// get geopoint
router.get('/:id/get', function(req, res, next) {
  if (!GLOBAL.sessions[req.params.id]) {
    return res.status(400).send("sorry, no such folowee :-/");
  }

  var pos = req.body;
  pos.timestamp = new Date();
  GLOBAL.sessions[req.params.id].push(pos);
  res.status(200).send(GLOBAL.sessions[req.params.id][0]);
});

/*
  generates a string guid
  
  strange code, indeed. there's a peculiar discussion about this code here:
  http://stackoverflow.com/questions/7940616/what-makes-this-pseudo-guid-generator-better-than-math-random
  
  but I believe this is a more pleasantful thread to fulfill the geek in you:
  http://stackoverflow.com/questions/1705008/simple-proof-that-guid-is-not-unique/1854801#1854801 
*/
function generateGuid() {
    var S4 = function() {
       return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

module.exports = router;
