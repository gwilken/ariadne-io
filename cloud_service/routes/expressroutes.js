const ObjectID = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();

router.get('/history/:name/:field', function(req, res) {

  console.log('history route hit', req.params);

  db.collection.find({}, { _id: 0, telemetry: { "Solar Controller Monitor" : {   "current" : 1}}} ).toArray( function(err, doc) {

    res.json(doc[0]);
  })

  res.send('ok');

});


module.exports = router;
