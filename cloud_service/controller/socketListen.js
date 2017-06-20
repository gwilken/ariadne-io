
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
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
