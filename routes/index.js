var express = require('express');
var router = express.Router();
var functions = require('../js/functions');
var scripts = require('../public/javascripts/scripts');

router.get('/', function(req, res, next) {
    functions.getSampleWords(function(sampleWords) {
        res.locals.sampleWords = sampleWords;
        res.render('index');
    });
});

router.post('/getpoem', function(req, res) {
    var db = req.db;
    var word = req.body.word;
    var length = req.body.counter;
    word = word.toLowerCase();
    functions.getPoem(word, length, function(poem) {
        res.send(poem);
    });
});

router.post('/votepoem', function(req, res) {
  var poem = req.body.poem;
  var vote = req.body.vote;
  functions.updatePoem(poem, vote, function(message) {
    res.send(message);
  });
});

module.exports = router;
