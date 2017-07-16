const WebSocket = require('ws');
const mongo = require("../model/mongo.js");

const wss = new WebSocket.Server({ port: 8080 });

var telemetry = {};
var count = 0;
var data;

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(packet) {

    try {
      data = JSON.parse(packet);
    } catch(err) {
      console.log('error at parse incoming json', err);
    }

    if(mongo.collection) {
      data.createdAt = Date.now();

      count++;

      if(count >= 50) {

        mongo.collection.insertOne(data, function(err, res) {
          if(err) console.log(err);
          console.log('data added to db');
        });

        count = 0;
      }
    }

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(packet);
      }
    });

  });

});
