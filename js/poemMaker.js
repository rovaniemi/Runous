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

function createPoem(poem, length, cb) {
    if (length === 0) {
        cb(poem);
    } else {
        length--;
        var words = poem.split(" ");
        var lastWord = words[words.length - 2];
        controller.getNextWordFromDB(lastWord, function(related) {
            if (!related) {
                cb(null);
            }
            related = related.sort(helpers.sortByProb);
            var j = Math.floor(Math.random() * 3);
            if (related.length < 3) {
                j = Math.floor(Math.random() * related.length);
            }
            var nextWord = related[j].word;
            poem += nextWord + ' ';
            createPoem(poem, length, cb);
        });
    }
}
