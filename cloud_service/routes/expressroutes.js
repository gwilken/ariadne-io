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
  ).limit(10).forEach( (doc) => {

    arr.push(doc.telemetry["Solar Controller Monitor"].current);

  }), () => done(function() {
    res.json(arr);
  }

});


module.exports = router;
