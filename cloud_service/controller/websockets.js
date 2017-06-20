const WebSocket = require('ws');
const mongo = require("../model/mongo.js");

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(packet) {

    var data = JSON.parse(packet);

    //console.log(data);

    if(mongo.collection) {

      console.log('put to db here');

    }


    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(packet);
      }
    });

  });


});
