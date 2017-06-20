const ObjectID = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();

router.get('/history/:name/:field', function(req, res) {

  console.log('history route hit', req.params);

  mongo.collection.find({}).toArray( function(err, doc) {

    res.json(doc);
  })

  res.send('ok');

});


module.exports = router;
