const ObjectId = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();

router.get('/telemetry/:family/:name/:time', function(req, res) {

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
      var sorted =[];
      var average = 0;

      try {
        if(docs.length > 0) {
          for(var i = 0; i < docs.length; i++) {
            if(Object.keys(docs[i]).length > 0) {
              for(var j = 0; j < docs[i].telemetry[0].data.length; j++) {
                if(docs[i].telemetry[0].data[j].displayName === req.params.name) {
                  var data = docs[i].telemetry[0].data[j].data;
                  if (data < 0) data = 0;
                  arr.push(data);
                }
              }
            }
          }
        }

        var data = arr.slice();
        sorted = arr.sort((a, b) => { return a - b; } );
        average = arr.reduce((sum, val) => { return sum + val }) / arr.length;

      } catch(err) {
        console.log(err);
      }

      var response = {
        data: data,
        family: req.params.family,
        name: req.params.name,
        high: sorted[arr.length - 1].toFixed(2),
        low: sorted[0].toFixed(2),
        average: average.toFixed(2)
      }

      res.json(response);
      }
  });
})

router.get('/quicklook/:family/:name/:time', function(req, res) {

  var time = Date.now() - (parseInt(req.params.time) * 60000);


  mongo.collection.aggregate([
    { $match: { "telemetry.family": req.params.family } },

    { $unwind: "$telemetry.data" },

    { $group: {
      "_id": $_id,
      "data" : { "$push": "$telemetry.data.data" }
      }
    }
  ]).toArray(function(err, docs) {

    res.json(docs);

  })



  // mongo.collection.find({
  //   createdAt: { $gt: time }
  // }, {
  //   _id: 0,
  //   telemetry: {
  //     $elemMatch: {
  //       family: req.params.family,
  //     }
  //   },
  // }).toArray(function(err, docs) {
  //
  //         if(err) {
  //           console.log(err);
  //           res.end();
  //         } else {
  //
  //           var arr = [];
  //           var dataArr = [];
  //
  //           try {
  //             if(docs.length > 0) {
  //               for(var i = 0; i < docs.length; i++) {
  //                 if(Object.keys(docs[i]).length > 0) {
  //                   for(var j = 0; j < docs[i].telemetry[0].data.length; j++) {
  //                     if(docs[i].telemetry[0].data[j].displayName === req.params.name) {
  //                       var data = docs[i].telemetry[0].data[j].data;
  //                       if (data < 0) data = 0;
  //                       arr.push(data);
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //
  //             dataArr = arr.slice();
  //
  //           } catch(err) {
  //             console.log(err);
  //           }
  //
  //           var response = {
  //             family: req.params.family,
  //             name: req.params.name,
  //             data: dataArr
  //           }
  //
  //           res.json(response);
  //           }
  //       });
})

module.exports = router;
