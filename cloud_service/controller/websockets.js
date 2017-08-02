const WebSocket = require('ws');
const mongo = require("../model/mongo.js");

const wss = new WebSocket.Server({ port: 8080 });
//below for local testing
//var ws = new WebSocket('ws://www.rednightsky.com:8080');

var telemetry = [];
var count = 0;
var data;

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(packet) {

    try {
      telemetry = JSON.parse(packet);
      count++;

      if(count >= 180) {
        count = 0;
        if(mongo.collection) {
          var d = new Date();

          var doc = {
            telemetry: telemetry,
            createdAt: d.getTime()
          };

          mongo.collection.insert(doc, function(err) {
            if(err) console.log('error at mongo insert telemetry', err);
            console.log('inserted');
          })
        }
      }

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
