const http = require('http');
const WebSocket = require('ws');
const mongo = require("../model/mongo.js");
const url = require('url');
const net = require("net");


//const automation = require("./automation");
const gps = require("./gps");
const motor = require("./motor");

//const t = require("./wireless");

const realTimeInterval = 3000;

var sensor = {};

const server = net.createServer(function(socket) {
  socket.on("data", function(data) {
    sensor = JSON.parse(data);

    if (relayWs.readyState === WebSocket.OPEN) {
      relayWs.send( JSON.stringify( sensor ) );
    };

  })
});

server.listen(3215, '192.168.10.1');

//log to db
//send to relay via WebSocket

module.exports = function(app) {

  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });
  const relayUrl  = url.format('http://www.rednightsky.com');
  var relayWs = null;


  wss.on('connection', (ws) => {
    console.log('Websocket client connected...');

    wss.on('error', function(err) {
      console.log('error at web socket server:', err);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('error', function(err) {
      console.log('error at web socket:', err);
    });
  });


  var connectExternalServer = function () {

    relayWs = new WebSocket(relayUrl);

    relayWs.on('open', function() {
      console.log('Connected to external server.');
    });

    relayWs.on('error', function() {
      console.log('Error on external server socket. Is it up?');
    });

    relayWs.onclose = function() {
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
    if (relayWs.readyState === WebSocket.OPEN) {
      relayWs.send( JSON.stringify( gps ) );
      relayWs.send( JSON.stringify( motor ) );
    };
  }, 1000);


  connectExternalServer();

}
