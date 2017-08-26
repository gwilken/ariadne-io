const ObjectId = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();

router.get('/telemetry/:family/:name/:time', function(req, res) {

  //console.log(req.params.family, req.params.name);

  var time = Date.now() - (req.params.time * 60000);

  mongo.collection.find( {
    createdAt: { $gt: time }
  }, {
    _id: 0,
    telemetry: { $elemMatch: { family: req.params.family, } },
  }).toArray(function(err, docs) {

    console.log(req.params.family, req.params.name, docs.length);

    //console.log( JSON.stringify(docs) );


    for(var x = 0; x < docs.length; x++) {

      if(Object.keys(docs[x]).length > 0) {



      console.log(docs[x].telemetry[0].family);
    }

    }

    res.end();
    //
    // if(err) {
    //   console.log(err);
    //   res.end();
    // } else {
    //
    //   var arr = [];
    //   var sorted =[];
    //   var average = 0;
    //
    //   try {
    //     if(docs.length > 0) {
    //       for(var i = 0; i < docs.length; i++) {
    //         for(var j = 0; j < docs[i].telemetry[0].data.length; j++) {
    //           if(docs[i].telemetry[0].data[j].displayName === req.params.name) {
    //             var data = docs[i].telemetry[0].data[j].data;
    //             if (data < 0) data = 0;
    //             arr.push(data);
    //           }
    //         }
    //       }
    //     }
    //
    //     var data = arr.slice();
    //     sorted = arr.sort((a, b) => { return a - b; } );
    //     average = arr.reduce((sum, val) => { return sum + val }) / arr.length;
    //
    //   } catch(err) {
    //     console.log(err);
    //   }
    //
    //   var response = {
    //     data: data,
    //     family: req.params.family,
    //     name: req.params.name,
    //     high: sorted[docs.length - 1].toFixed(2),
    //     low: sorted[0].toFixed(2),
    //     average: average.toFixed(2)
    //   }
    //
    //   res.json(response);
    //   }
  });
})

router.get('/quicklook/:family/:name/:num', function(req, res) {

  var num = parseInt(req.params.num);

  mongo.collection.find({ $query: {}, $orderby: { "createdAt": -1 } }, {
    _id: 0,
    telemetry: {
      $elemMatch: {
        family: req.params.family,
      }
    },
  }).limit(num)
      .toArray(function(err, docs) {

          if(err) {
            console.log(err);
            res.end();
          } else {

            var arr = [];

            try {
              if(docs.length > 0) {
                for(var i = 0; i < docs.length; i++) {
                  for(var j = 0; j < docs[i].telemetry[0].data.length; j++) {
                    if(docs[i].telemetry[0].data[j].displayName === req.params.name) {
                      var data = docs[i].telemetry[0].data[j].data;
                      if (data < 0) data = 0;
                      arr.push(data);
                    }
                  }
                }
              }

              var data = arr.reverse().slice();

            } catch(err) {
              console.log(err);
            }

            var response = {
              family: req.params.family,
              name: req.params.name,
              data: data
            }

            res.json(response);
            }
        });
})

module.exports = router;
