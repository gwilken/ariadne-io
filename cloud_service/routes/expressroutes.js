const ObjectId = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();


router.get('/telemetry/:family/:time', function(req, res) {
  var time = Date.now() - (req.params.time * 60000);

  mongo.collection.find( { createdAt: { $gt: time } } ).toArray(function(err, docs) {
    if(err) {
      console.log(err);
      res.end();
    } else {

        var list = docs.telemetry.filter((elem) => { return elem.family === req.params.family; })

        console.log(list);

        res.json(docs);
      }
  });
})


module.exports = router;
