const net = require("net");

var telemetry = null;

const server = net.createServer(function(socket) {
	socket.on("data", function(data) {
		telemetry = JSON.parse(data);
		console.log('in wireless.js', telemetry);
	})
});



server.listen(3215, '192.168.10.1');

module.exports = telemetry;