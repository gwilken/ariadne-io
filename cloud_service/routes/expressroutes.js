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

router.get('/datapoint/:obj/:field/:time', function(req, res) {

  console.log('route hit');

  var secs = Date.now() - (req.params.time * 60000);

  var id = secs.toString(16) + "0000000000000000";

  mongo.collection.find( { _id: { $gt: id } } ).toArray(function(err, docs) {
    console.log(docs);
  })

})

module.exports = router;
