const ObjectId = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();


router.get('/telemetry/:family/:time', function(req, res) {

  console.log(req.params.family, req.params.time);

  var time = Date.now() - (req.params.time * 60000);

  mongo.collection.find( { createdAt: { $gt: time } } ).toArray(function(err, docs) {
    if(err) {
      console.log(err);
      res.end();
    } else {

        var list = docs.filter((elem) => {

          return elem.telemetry.filter((elem2) => {
            return elem2.family === req.params.family;
          })

        })

        //console.log(list);

        res.json(list);
      }
  });
})


module.exports = router;
