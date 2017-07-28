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

  var ws;
  //const server = http.createServer(app);
  const wss = new WebSocket.Server({port: 8080}});

  wss.on('connection', function connection(ws) {

    console.log('client connected');

    ws.on('message', function incoming(packet) {
      try {
        telemetry = JSON.parse(packet);
      } catch(err) {
        console.log('error at parse incoming json', err);
      }

      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(packet);
        }
      });
    });
  });

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

    if (ws.readyState === WebSocket.OPEN) {
      ws.send( JSON.stringify( telemetry ) );
    };
  }, 1000);


  setInterval(function() {
    var doc = {};
    doc.telemetry = telemetry;
    doc.createdAt = Date.now();

    mongo.collection.insert(doc, function(err) {
      if(err) console.log('error at mongo insert telemetry', err);
    })
  }, 180000)

  connect();

}
