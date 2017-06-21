const ObjectID = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();

router.get('/history/:name/:field', function(req, res) {

  var arr = [];

  mongo.collection.find(
    {},
    {"telemetry.House Battery Bank.current" : 1}
  ).sort( { _id: -1 } ).limit(10).forEach( function(doc) {

    arr.push(doc.telemetry["House Battery Bank"].current);

  }, function(err) {
    if(err) {
      console.log(err);
      res.end();
    }
    else res.json(arr);
  });
});


router.get('/sensor/:name', function(req, res) {

  console.log('sensot route hit', req.params);

  var arr = [];

  var field = 'telemetry.' + req.params.name;

  mongo.collection.find(
    {},
    {field : 1}
  ).sort( { _id: -1 } ).limit(10).forEach( function(doc) {

    arr.push(doc.telemetry["House Battery Bank"].current);

  }, function(err) {

    if(err) {
      console.log(err);
      res.end();
    }
    else res.json(arr);

  });

});

module.exports = router;
