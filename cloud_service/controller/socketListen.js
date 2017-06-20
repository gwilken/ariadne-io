const WebSocket = require('ws');
const mongo = require("../model/mongo.js");

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(packet) {

    //console.log('received: %s', message);

    var temp = JSON.parse(packet);
    console.log(temp);

  });

});


    //
    //
    // ws.on('message', function incoming(data) {
    //
    //   var temp = JSON.parse(data);
    //
    //   console.log(temp);
    //
