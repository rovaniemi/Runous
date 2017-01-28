var express = require('express');
var router = express.Router();
var functions = require('../js/functions');


router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/getpoem',function(req,res){
  var db = req.db;
  var word = req.body.word;
  var amount = req.body.counter;
  var poem = '';
  word = word.toLowerCase();

  var testi = db.get('testi');

  if (amount > 24 || amount < 3) {
    res.send('Sanoja on oltava vähintään kolme ja enintään 24.')
  }

  luoRuno(testi, word, amount, poem);

  function luoRuno(coll, word, amount, poem) {
    coll.findOne({"word": word}, {limit: {"related": 3}}, '-_id').then((docs) => {
      if (amount == 0) {
        poem = functions.capitalizeFirstLetter(poem);
        poem = functions.divide(poem);
        res.send(poem);
      } else if (docs !== null) {
        amount--;
        // console.log('Tulos: ' + JSON.stringify(docs));
        // console.log('Sana: ' + docs.word);
        poem += docs.word + ' ';
        // console.log('Runoon ' + poem + ' lisättiin sana');
        var related = docs.related;
        related = related.sort(functions.sortByProb);
        // console.log('Related: ' + JSON.stringify(related));
        var j = Math.floor(Math.random() * 3);
        if (related.length < 3 ) {
          j = Math.floor(Math.random() * related.length);
        }
        word = related[j].word;
        // console.log('Uusi sana: ' + word);
        luoRuno(coll, word, amount, poem);
      } else {
        res.send('Aloitussanaa ei löytynyt Kalevalasta.');
      }
    });
  };

  //
  // function callback(res, i, word, poem) {
  //   console.log('Hei olen callback');
  //   if (i == amount) {
  //     poem = functions.capitalizeFirstLetter(poem);
  //     poem = functions.divide(poem);
  //     console.log('Lähetetään runo');
  //     res.send(poem);
  //   } else {
  //     testi.findOne({"word": word}, '-_id').then((docs) => {
  //       console.log('Kasvatetaan i:stä');
  //       i++;
  //       console.log('Sana: ' + docs.word);
  //       poem += docs.word + ' ';
  //       console.log('Runoon ' + poem + ' lisättiin sana');
  //       var related = docs.related;
  //       related = related.sort(functions.sortByProb);
  //       console.log('Related: ' + JSON.stringify(related));
  //       var j = Math.floor(Math.random() * 3);
  //       if (related.length < 3 ) {
  //         j = Math.floor(Math.random() * related.length);
  //       }
  //       word = related[j].word
  //       console.log('Uusi sana: ' + word);
  //       console.log('callback 2');
  //       callback(res, i, word, poem);
  //     });
  //   }
  // }

  // for(var i = 0; i < amount; i++){
  //     if(data.hasOwnProperty(word)){
  //         poem += word + ' ';
  //         var j = Math.floor(Math.random() * data[word].length);
  //         word = data[word][j];
  //     } else {
  //         poem = 'Aloitussanaa ei löytynyt Kalevalasta.';
  //         res.send(poem);
  //         return;
  //     }
  // }

  // for(var i = 0; i < amount; i++){
    // console.log('Word: ' + word);
    // var tulos = db.collection.find({"word" : word});
    // console.log('Tulos: ' + JSON.stringify(tulos));
    // if (tulos !== null) {
    //   JSON.parse(tulos);
    //   poem = JSON.stringify(tulos.word);
    // } else {
    //   poem = 'Aloitussanaa ei löytynyt Kalevalasta.';
    //   res.send(poem);
    //   return;
    // }

  //}
  //
});

module.exports = router;
