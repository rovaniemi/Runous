var exports = module.exports = {};
var express = require('express');
var app = express();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/tietok');
var collection = db.get('testi');

exports.getNextWordFromDB = function(lastWord, cb) {
    collection.findOne({"word": lastWord}, '-_id').then((docs) => {
        if (!docs) {
            cb(null);
        }
        cb(docs.related);
    });
};
