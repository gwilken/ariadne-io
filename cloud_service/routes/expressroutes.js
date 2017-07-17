const ObjectId = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();


router.get('/telemetry/:family/:name/:time', function(req, res) {

  console.log("route hit:", req.params.family, req.params.name, req.params.time);

  var time = Date.now() - (req.params.time * 60000);

  mongo.collection.find( {
    createdAt: { $gt: time }
  }, {
    _id: 0,
    telemetry: { $elemMatch: { family: req.params.family, } },
  }).toArray(function(err, docs) {

    if(err) {
      console.log(err);
      res.end();
    } else {

      var arr = [];

      for(var i = 0; i < docs.length; i++) {
        for(var j = 0; j < docs[i].telemetry[0].data.length; j++) {
          if(docs[i].telemetry[0].data[j].displayName === req.params.name) {
            arr.push(docs[i].telemetry[0].data[j].data);
          }
        }
      }
      console.log(arr);
      res.json(arr);
      }
  });
})


module.exports = router;
