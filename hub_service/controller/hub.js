const http = require('http');
const WebSocket = require('ws');
const mongo = require("../model/mongo.js");
const url = require('url');
const net = require("net");

//const automation = require("./automation");
const gps = require("./gps");
const motor = require("./motor");


module.exports = function(app) {

  // const server = http.createServer(app);
  // const wss = new WebSocket.Server({ server });

  var remoteServer = null;

  const realTimeInterval = 3000;

  var sensor = {};




  // wss.on('connection', (ws) => {
  //   console.log('Websocket client connected...');
  //
  //   wss.on('error', function(err) {
  //     console.log('error at web socket server:', err);
  //   });
  //
  //   ws.on('close', () => {
  //     console.log('Client disconnected');
  //   });
  //
  //   ws.on('error', function(err) {
  //     console.log('error at web socket:', err);
  //   });
  // });


  var connectExternalServer = function () {

    remoteServer = new WebSocket( url.format('ws://50.116.5.92') );

    remoteServer.on('open', function() {
      console.log('Connected to external server.');
    });

    remoteServer.on('error', function(err) {
      console.log('Error on external server socket. Is it up?', err);

    });

    remoteServer.onclose = function() {
      console.log('Connection to external server closed.');

      setTimeout(function() {
        console.log('Attempting to reconnect to external server...');
        connectExternalServer();
      }, 5000);

    };
  };

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
    if (remoteServer.readyState === WebSocket.OPEN) {
      remoteServer.send( JSON.stringify( gps ) );
      remoteServer.send( JSON.stringify( motor ) );
    };
  }, 1000);

  const sensorServer = net.createServer(function(socket) {
    socket.on("data", function(data) {
      sensor = JSON.parse(data);

      if (remoteServer.readyState === WebSocket.OPEN) {
        remoteServer.send( JSON.stringify( sensor ) );
      };

    })
  });

  sensorServer.listen(3215, '192.168.10.1');


  connectExternalServer();

}
