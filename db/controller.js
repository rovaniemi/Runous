var exports = module.exports = {};
var express = require('express');
var data = require('../json/data')
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mongoDb;

MongoClient.connect('mongodb://localhost:27017/runous', function (err, db) {
  if (err) {
    throw err;
  } else {
    console.log('connected succesfully');
    mongoDb = db;
    db.listCollections({ name: 'kalevala' })
      .next(function (err, collinfo) {
        if (!collinfo) {
          db.collection('kalevala').insertMany(data);
        }
      });
  }
});

exports.getRelatedWordsFromDB = function (nextWord, lastWord, cb, vote) {
  mongoDb.collection('kalevala').findOne({ word: lastWord }, function (err, result) {
    if (err || !result) {
      console.log('err tai result ei määritelty, kun haettiin sanalla ' + lastWord);
      cb(null, null, null)
    } else {
      cb(nextWord, lastWord, result.related, vote);
    }
  });
};

exports.updateRelated = function (word, related) {
  mongoDb.collection('kalevala').updateOne({ 'word': word }, { $set: { 'related': related } });
};
