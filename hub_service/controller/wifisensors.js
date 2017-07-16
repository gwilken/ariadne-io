const net = require("net");

var packet = {};

const sensorServer = net.createServer(function(socket) {
  socket.on("data", function(data) {
    try {
      packet = JSON.parse(data);
      //console.log(packet);
    } catch(err) {
      console.log('error at wireless sensor', err);
    }
  })
});

sensorServer.listen(3215, '192.168.10.1');

module.exports = packet;
