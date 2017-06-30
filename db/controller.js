var exports = module.exports = {};
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mongoDb;

MongoClient.connect('mongodb://localhost:27017/tietok', function(err, db) {
  if (err) {
    throw err;
  } else {
      console.log('connected succesfully');
      mongoDb=db;
  }
});

exports.getRelatedWordsFromDB = function(nextWord, lastWord, cb) {
  mongoDb.collection('testi').findOne({word: lastWord }, function(err, result) {
    if (err || !result) {
        cb(null, null, null)
    } else {
        console.log(lastWord + ' result: ' + JSON.stringify(result.related));
        cb(nextWord, lastWord, result.related);
    }
  });
};

exports.updateRelated = function(word, related) {
    console.log('word '+word);
    console.log('related: ' + JSON.stringify(related));
    mongoDb.collection('testi').updateOne({'word': word}, { $set: {'related': related} });
};
