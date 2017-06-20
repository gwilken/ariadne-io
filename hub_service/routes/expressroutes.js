const ObjectID = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const db = require("../model/mongo");

const router = new express.Router();


router.get('/login',
  function(req, res) {

  });

//
// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//
//   function(req, res) {
//     res.redirect('/app/home.html');
//   });


router.get('/history', function (req, res) {

  var obj = req.body;
  console.log(obj);

});

router.get('/automation/:command', function(req, res) {



  if(req.query.target === 'runningLights') {

    if(req.query.state === 'true') {
        board.digitalWrite(dcPanel.runningLights.relayPin, board.LOW);
        res.send({target: 'runningLights', status: 'true'});
    };

    if(req.query.state === 'false') {
        board.digitalWrite(dcPanel.runningLights.relayPin, board.HIGH);
        res.send({target: 'runningLights', status: 'false'});
    };
  };

  if(req.query.target === 'cabinLights') {

    if(req.query.state === 'true') {
        board.digitalWrite(dcPanel.cabinLights.relayPin, board.LOW);
        res.send({target: 'cabinLights', status: 'true'});
    };

    if(req.query.state === 'false') {
        board.digitalWrite(dcPanel.cabinLights.relayPin, board.HIGH);
        res.send({target: 'cabinLights', status: 'false'});
    };
  };

  if(req.query.target === 'spreaderLights') {

    if(req.query.state === 'true') {
        board.digitalWrite(dcPanel.spreaderLights.relayPin, board.LOW);
        res.send({target: 'spreaderLights', status: 'true'});
    };

    if(req.query.state === 'false') {
        board.digitalWrite(dcPanel.spreaderLights.relayPin, board.HIGH);
        res.send({target: 'spreaderLights', status: 'false'});
    };
  };

  if(req.query.target === 'gps') {

    if(req.query.state === 'true') {
        board.digitalWrite(dcPanel.gps.relayPin, board.LOW);
        res.send({target: 'gps', status: 'true'});
    };

    if(req.query.state === 'false') {
        board.digitalWrite(dcPanel.gps.relayPin, board.HIGH);
        res.send({target: 'gps', status: 'false'});
    };
  };
});

router.get('/config', function (req, res) {
  console.log('config route');
});

module.exports = router;
