const WebSocket = require('ws');
const mongo = require("../model/mongo.js");

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(packet) {

    var data = JSON.parse(packet);

    console.log(data);

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
