
const WebSocket = require('ws');
const mongo = require("../model/mongo.js");
const ObjectID = require('mongodb').ObjectID;
const url = require('url');
const net = require("net");

//const automation = require("./automation");
const gps = require("./gps");
const motor = require("./motor");

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

connect();

    setInterval(function() {

      gps._id = new ObjectID()
      packets.push(gps);

      motor._id = new ObjectID();
      packets.push(motor);

      if (ws.readyState === WebSocket.OPEN) {
        ws.send( JSON.stringify( gps ) );
        ws.send( JSON.stringify( motor ) );
      };
    }, 1000);


    const sensorServer = net.createServer(function(socket) {
      socket.on("data", function(data) {

        try {
          packet = JSON.parse(data);

          packet._id = new ObjectID();

          packets.push(packet);

          if (documents.length >= 1000 && mongo.collection) {
            var documents = packets.slice();
            packets = [];
            mongo.collection.insertMany(documents, function(err) {
              console.log('docs added');
            });
          }

          if (ws.readyState === WebSocket.OPEN) {
            ws.send( JSON.stringify( packet ) );
          };

        } catch(err) {
          console.log(err);
        }

      })
    });

    sensorServer.listen(3215, '192.168.10.1');
