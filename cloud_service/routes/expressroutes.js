const ObjectId = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();

router.get('/all/:time', function(req, res) {

  var time = Date.now() - (parseInt(req.params.time) * 60000);

  mongo.collection.find({
    "createdAt": { $gt: time}
  }).toArray(function(err, docs) {
    res.json(docs);
  })

})

router.get('/telemetry/:family/:name/:time', function(req, res) {

  var time = Date.now() - (parseInt(req.params.time) * 60000);

  mongo.collection.aggregate([
    { $match: { "createdAt": { "$gt": time } } },
    { $unwind: "$telemetry" },
    { $match: { "telemetry.family": req.params.family } },
    { $unwind: "$telemetry.data"},
    { $match: { "telemetry.data.displayName": req.params.name } },
    { $group: {
      "_id": null,
      "createdAt": { $push: "$createdAt" },
      "data" : {$push: "$telemetry.data.data"},
      "high": {$max: "$telemetry.data.data"},
      "low": {$min : "$telemetry.data.data"},
      "average": {$avg: "$telemetry.data.data"}
    }}
  ]).toArray(function(err, docs) {
    res.json(docs);
  })
})

router.get('/quicklook/:family/:name/:time', function(req, res) {

  var time = Date.now() - (parseInt(req.params.time) * 60000);

  mongo.collection.aggregate([
    { $match: { "createdAt": { "$gt": time } } },
    { $unwind: "$telemetry" },
    { $match: { "telemetry.family": req.params.family } },
    { $unwind: "$telemetry.data"},
    { $match: { "telemetry.data.displayName": req.params.name } },
    { $group: {
      "_id": null,
      "data" : {$push: "$telemetry.data.data"}
    }}
  ]).toArray(function(err, docs) {
    res.json(docs);
  })
})

module.exports = router;
