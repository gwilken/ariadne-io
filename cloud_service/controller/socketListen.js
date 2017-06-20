const http = require('http');
const WebSocket = require('ws');

module.exports = function(app) {

  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Websocket client connected...');

    ws.on('message', function incoming(data) {

      var temp = JSON.parse(data);

      console.log(temp);

      // wss.clients.forEach(function each(client) {
      //   if (client !== ws && client.readyState === WebSocket.OPEN) {
      //     client.send(data);
      //   }
      // });

    });

  	ws.on('close', () => {
      	console.log('Client disconnected');
  		});

  });

}
