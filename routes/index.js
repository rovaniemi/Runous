var express = require('express');
var router = express.Router();
var data = require('../json/data.json');
var functions = require('../js/functions');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  var word = req.body.start;
  var amount = req.body.amount;

  var poem = '';
  var flag = 0;
  var j = 0;
  word = word.toLowerCase();

  if (amount > 24 || amount < 3) {
    flag = 2;
  }

  //data.jsonissa on määritelty muuttuja data
  for(var i = 0; i < amount; i++){
//        console.log(i + ':nnes sana ' + sana);
      if(data.hasOwnProperty(word)){
          poem += word + ' ';
//	          console.log('Sanan kamut: ' + data[sana]);
          j = Math.floor(Math.random() * data[word].length);
          word = data[word][j];
          j = 0;
      } else {
          flag = 1;
      }
  }
poem = functions.capitalizeFirstLetter(poem);

//  console.log('runo: ' + runo);

poem = functions.divide(poem);

//jos tarkastin on muuttunut ykköseksi, määritellään ettei runoa syntynyt
if (flag == 1){
    poem = 'Aloitussanaa ei löytynyt Kalevalasta.';
  }
if (flag == 2) {
  poem = 'Sanoja on oltava enemmän kuin kaksi ja vähemmän kuin 25.';
}
  res.render('index', {poem: poem});
});

module.exports = router;
