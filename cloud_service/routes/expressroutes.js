const ObjectID = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();

router.post('/history', function(req, res) {

  console.log('history route hit', req.body);

  //
  // mongo.collection.find({}).sort( {createdAt: -1} ).toArray(function( err, docs) {
  //
  //   res.json(docs);
  //
  // })
  //
});


module.exports = router;
