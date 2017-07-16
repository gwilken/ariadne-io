const ObjectId = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();

router.get('/history/:name/:field', function(req, res) {

  var arr = [];

  mongo.collection.find(
    {},
    {"telemetry.House Battery Bank.current" : 1}
  ).sort( { _id: 1 } ).limit(10).forEach( function(doc) {

    arr.push(doc.telemetry["House Battery Bank"].current);

  }, function(err) {
    if(err) {
      console.log(err);
      res.end();
    }
    else res.json(arr);
  });
});


router.get('/sensor/:name/:limit', function(req, res) {

  var arr = [];
  var field = 'telemetry.' + req.params.name;

  console.log('sensor route hit', field);

  mongo.collection.find({})
    .sort( { _id: 1 } )
      .limit(parseInt(req.params.limit))
      .forEach( function(doc) {

        arr.push(doc.telemetry[req.params.name]);

      }, function(err) {
        if(err) {
          console.log(err);
          res.end();
        }
        else res.json(arr);
      });

});

router.get('/data/:time', function(req, res) {

  var secs = Date.now() - (req.params.time * 60000);
  var objID = ObjectId.createFromTime(secs/1000);

  mongo.collection.find( { _id: { $gt: objID } } ).toArray(function(err, docs) {
    if(err) {
      console.log(err);
      res.end();
    }
    else res.json(docs);
  });

})

router.get('/telemetry/:family/:time', function(req, res) {

  console.log(req.params.family);
  console.log(req.params.time);

  var time = Date.now() - (req.params.time * 60000);

  mongo.collection.find( { createdAt: { $gt: time } } ).toArray(function(err, docs) {
    if(err) {
      console.log(err);
      res.end();
    } else {

        var filteredDocs = docs.telemetry.filter( (elem) => {
          return elem.family === req.params.family;
        })

        res.json(filteredDocs);
      }
  });

})


module.exports = router;
