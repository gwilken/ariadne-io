const ObjectID = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();

router.get('/history/:name/:field', function(req, res) {

  console.log('history route hit', req.params);

  var arr = [];

  mongo.collection.find(
    {},
    {"telemetry.Solar Controller Monitor.current" : 1}
  ).forEach(function(doc) {

    if(doc.telemetry."Solar Controller Monitor".current) {
      arr.push(doc.telemetry."Solar Controller Monitor".current);
    }
    res.send(arr);
  })

});


module.exports = router;
