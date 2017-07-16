const net = require("net");

const sensorServer = net.createServer(function(socket) {
  socket.on("data", function(data) {
    try {
      packet = JSON.parse(data);
    } catch(err) {
      console.log('error at wireless sensor', err);
    }
  })
});

sensorServer.listen(3215, '192.168.10.1');

module.exports = packet;
