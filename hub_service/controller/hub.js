
const WebSocket = require('ws');
const mongo = require("../model/mongo.js");
const ObjectID = require('mongodb').ObjectID;
const url = require('url');

//const automation = require("./automation");
const gps = require("./gps");
const motor = require("./motor");
const sensor = require("./wifisensors");

var ws;
var packet = {};
var packets = [];
var documents = [];
var count = 0;
const realTimeInterval = 3000;

var connect = function () {
  ws = new WebSocket('ws://www.rednightsky.com:8080');

  ws.on('open', function open() {
    console.log('Websocket connection open.');
  });

  ws.on('message', function incoming(data) {
    console.log(data);
  });

  ws.on('error', function(err) {
    console.log('error at web socket.');
  });

  ws.on('close', () => {
    console.log('Websocket disconnected.');
  });

  ws.onclose = function() {
    console.log('Connection to external server closed. Attempting reconnect in 5 sec');
    setTimeout(connect, 5000);
  };
}

setInterval(function() {
  gps._id = new ObjectID()
  packets.push(gps);

  motor._id = new ObjectID();
  packets.push(motor);

  sensor._id = new ObjectID();
  packets.push(sensor);
  console.log(sensor);

  if (packets.length >= 20 && mongo.collection) {
    mongo.collection.insertMany(packets, function(err) {
      if(err) console.log(err);
      console.log('packets added to db');
    });
    packets = [];
  }

  if (ws.readyState === WebSocket.OPEN) {
    ws.send( JSON.stringify( gps ) );
    ws.send( JSON.stringify( motor ) );
    ws.send( JSON.stringify( sensor ) );
  };

}, 1000);

connect();
