var exports = module.exports = {};
var controller = require('../db/controller');
var helpers = require('../js/helpers');

exports.getPoem = function(word, length, cb) {
    var poem = word + ' ';
    createPoem(poem, length, function(words) {
        if (!words) {
            poem = 'Sanaa ei löytynyt Kalevalasta.';
        } else {
            poem = helpers.divide(words);
            poem = helpers.capitalizeFirstLetter(poem);
        }
        cb(poem);
    });
};

exports.updatePoem = function(poem, vote, cb) {
    console.log('updating poem');
  var words = poem.split(" ");
  for (i=0; i<words.length-1;i++) {
    if (/^</.test(words[i])) {
      i++;
    }
    word = words[i].replace(/[^a-zåäöA-ZÅÄÖ ]/g, "");
    word = word.toLowerCase();
    if (/^</.test(words[i+1])) {
      i++;
    }
    nextWord = words[i+1].replace(/[^a-zåäöA-ZÅÄÖ ]/g, "");
    nextWord = nextWord.toLowerCase();
    console.log('next word: ' + nextWord)
    controller.getRelatedWordsFromDB(nextWord, word, updateProbability);
  }
  cb();
};

function updateProbability(nextWord, lastWord, related) {
  if (related === null) {
    return;
  }
  for(let j=0; j < related.length; j++) {
    if (related[j].word == nextWord) {
      var oldProb = related[j].prob;
      related[j] = {'word': nextWord, 'prob': oldProb+10};
    }
  }
  controller.updateRelated(lastWord, related);
}

function createPoem(poem, length, cb) {
    if (length === 0) {
        cb(poem);
    } else {
        length--;
        var words = poem.split(" ");
        var lastWord = words[words.length - 2];
        console.log('lastWord: ' + lastWord);
        controller.getRelatedWordsFromDB(null, lastWord, function(oldWord, lastWord, related) {
            if (related === null) {
                cb(null);
            } else {
                related = related.sort(helpers.sortByProb);
                var j = Math.floor(Math.random() * 3);
                if (related.length < 3) {
                    j = Math.floor(Math.random() * related.length);
                }
                var nextWord = related[j].word;
                poem += nextWord + ' ';
                createPoem(poem, length, cb);
            }
        });
    }
}
