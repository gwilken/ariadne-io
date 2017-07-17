const ObjectId = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();


router.get('/telemetry/:family/:name/:time', function(req, res) {

  //console.log("route hit:", req.params.family, req.params.name, req.params.time);

  var time = Date.now() - (req.params.time * 60000);

  mongo.collection.find( {
    createdAt: { $gt: time }
  }, {
    _id: 0,
    telemetry: { $elemMatch: {family: req.params.family}, data: {$elemMath: {displayName: req.params.name} } }
  }).toArray(function(err, docs) {

    if(err) {
      console.log(err);
      res.end();
    } else {
        //
        // var list = docs.filter((elem) => {
        //
        //   return elem.telemetry.filter((elem2) => {
        //     return elem2.family === req.params.family;
        //   })
        //
        // })
        //
        // //console.log(list);

        res.json(docs);
      }
  });
})


module.exports = router;
