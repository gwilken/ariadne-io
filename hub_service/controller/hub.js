const WebSocket = require('ws');
const mongo = require("../model/mongo.js");
const ObjectID = require('mongodb').ObjectID;
const url = require('url');
const http = require('http');
//const automation = require("./automation");
const gps = require("./gps");
const motor = require("./motor");
const telemetry = require("./wifisensors");

module.exports = function(app) {

  var internetServer;
  const wss = new WebSocket.Server({port: 8080});

  wss.on('connection', function() {
    console.log('client connected');
  });

  var connect = function () {
    internetServer = new WebSocket('ws://www.rednightsky.com:8080');

    internetServer.on('open', function open() {
      console.log('Websocket connection open.');
    });

    internetServer.on('message', function incoming(data) {
      console.log(data);
    });

    internetServer.on('error', function(err) {
      console.log('error at web socket.');
    });

    internetServer.on('close', () => {
      console.log('Websocket disconnected.');
    });

    internetServer.onclose = function() {
      console.log('Connection to external server closed. Attempting reconnect in 5 sec');
      setTimeout(connect, 5000);
    };
  }

  setInterval(function() {
    var list = telemetry.map((elem) => { return elem.displayName; })

    if(list.indexOf(motor.displayName) === -1) {
      telemetry.push(motor);
    }
      else {
        telemetry.splice(list.indexOf(motor.displayName), 1, motor);
      }

    if(list.indexOf(gps.displayName) === -1) {
      telemetry.push(gps);
    }
      else {
        telemetry.splice(list.indexOf(gps.displayName), 1, gps);
      }

    if (internetServer.readyState === WebSocket.OPEN) {
      internetServer.send( JSON.stringify( telemetry ) );
    };

    if(wss) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify( telemetry ) );
        }
      });
    }
  }, 1000);


  setInterval(function() {
    var doc = {};
    var d = new Date();
    doc.telemetry = telemetry;
    doc.createdAt = d;

    mongo.collection.insert(doc, function(err) {
      if(err) console.log('error at mongo insert telemetry', err);
    })
  }, 120000)

  connect();

}
