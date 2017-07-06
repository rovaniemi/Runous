var exports = module.exports = {};
var express = require('express');
var data = require('../json/data')
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mongoDb;
var collectionName = 'kalevala';
var collectionSize = 0;

MongoClient.connect('mongodb://localhost:27017/runous', function (err, db) {
  if (err) {
    throw err;
  } else {
    console.log('connected succesfully');
    mongoDb = db;
    db.listCollections({ name: collectionName })
      .next(function (err, collinfo) {
        if (!collinfo) {
          db.collection(collectionName).insertMany(data);
        }
        db.collection(collectionName).count(function(err, count) {
          collectionSize = count;
        });
      });
  }
});

exports.getRelatedWordsFromDB = function (nextWord, lastWord, cb, vote) {
  mongoDb.collection(collectionName).findOne({ word: lastWord }, function (err, result) {
    if (err || !result) {
      console.log('err tai result ei määritelty, kun haettiin sanalla ' + lastWord);
      cb(null, null, null)
    } else {
      cb(nextWord, lastWord, result.related, vote);
    }
  });
};

exports.updateRelated = function (word, related) {
  mongoDb.collection(collectionName).updateOne({ 'word': word }, { $set: { 'related': related } });
};

exports.findRandomWord = function (cb) {
  mongoDb.collection(collectionName).find().limit(-1).skip(Math.random() * collectionSize)
  .next(function (err, result) {
    if (err) {
      cb(null);
    } else {
      cb(result);
    }
  });
}
