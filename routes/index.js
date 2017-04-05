var express = require('express');
var router = express.Router();
var poemMaker = require('../js/poemMaker');

router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/getpoem', function(req, res) {
    var db = req.db;
    var word = req.body.word;
    var length = req.body.counter;
    word = word.toLowerCase();
    poemMaker.getPoem(word, length, function(poem) {
        res.send(poem);
    });
});

module.exports = router;
