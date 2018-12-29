const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017/ariadneIO';

var mongo = {
    db: null,
    collection: null,

    connect: function() {

      MongoClient.connect('mongodb://127.0.0.1:27017/ariadneIO', function(err, db) {

        if(err) console.log(err);

          console.log("Connected successfully to mongodb");



          mongo.db = db;
          mongo.collection = db.collection('data');
        });
    }
};

module.exports = mongo;
