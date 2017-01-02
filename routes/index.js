var express = require('express');
var router = express.Router();
var data = require('../json/data.json');
var functions = require('../js/functions');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/getpoem',function(req,res){
  var word = req['body']['word'];
  var amount = req['body']['counter'];
  var poem = '';
  word = word.toLowerCase();

  if (amount > 24 || amount < 3) {
    poem = 'Sanoja on oltava enemmän kuin kaksi ja vähemmän kuin 25.';
    res.send(poem);
    return;
  }

  for(var i = 0; i < amount; i++){
      if(data.hasOwnProperty(word)){
          poem += word + ' ';
          var j = Math.floor(Math.random() * data[word].length);
          word = data[word][j];
      } else {
          poem = 'Aloitussanaa ei löytynyt Kalevalasta.';
          res.send(poem);
          return;
      }
  }

  poem = functions.capitalizeFirstLetter(poem);
  poem = functions.divide(poem);

  res.send(poem);
});

module.exports = router;
