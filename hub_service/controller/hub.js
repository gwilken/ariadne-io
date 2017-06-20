
const WebSocket = require('ws');
const mongo = require("../model/mongo.js");
const url = require('url');
const net = require("net");

//const automation = require("./automation");
const gps = require("./gps");
const motor = require("./motor");

var sensor = {};
var ws = null;
const realTimeInterval = 3000;

ws = new WebSocket('ws://www.rednightsky.com:8080');

ws.on('open', function open() {
  console.log('Websocket connection open.');
});

ws.on('message', function incoming(data) {
  console.log(data);
});

ws.on('error', function(err) {
  console.log('error at web socket:', err);
  reconnect();
});

ws.on('close', () => {
  console.log('Websocket disconnected.');
});

ws.onclose = function() {
  console.log('Connection to external server closed.');
  reconnect();
};


var reconnect = function () {

  if (ws.readyState !== WebSocket.OPEN) {

    console.log('Attempting to reconnect to external server...');

    ws = new WebSocket('ws://www.rednightsky.com:8080');

    ws.on('error', function() {
      console.log('Server not found.');
      setTimeout(reconnect, 3000);
      })
  } else

      if (ws.readyState === WebSocket.OPEN) {
        console.log('Reconnected.');
      }
};

  // wss.on('connection', (ws) => {
  //   console.log('Websocket client connected...');
  //
  //   wss.on('error', function(err) {
  //     console.log('error at web socket server:', err);
  //   });
  //

  //

  // });




  //
  // setInterval(function() {
  //
  //   wss.clients.forEach((client) => {
  //     if (client.readyState === WebSocket.OPEN) {
  //       client.send( JSON.stringify( sensor ) );
  //     };
  //   });
  //
  //     if (relayWs.readyState === WebSocket.OPEN) {
  //       relayWs.send( JSON.stringify( sensor ) );
  //     };
  //
  //
  // }, realTimeInterval);

  setInterval(function() {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send( JSON.stringify( gps ) );
      ws.send( JSON.stringify( motor ) );
    };
  }, 1000);


  const sensorServer = net.createServer(function(socket) {
    socket.on("data", function(data) {
      sensor = JSON.parse(data);

      if (ws.readyState === WebSocket.OPEN) {
        ws.send( JSON.stringify( sensor ) );
      };

    })
  });

  sensorServer.listen(3215, '192.168.10.1');
