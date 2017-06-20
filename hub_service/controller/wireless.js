const net = require("net");

// wireless listen logic
obj telemetry = {
}

const server = net.createServer(function(socket) {
	

	socket.on("data", function(data) {

		//console.log(data.toJSON());

		console.log(data.toString());

		//var str = data.toString();

		//msg += str;

		// if (str === '}') {

		// 	try {

		// 		var json = JSON.parse(msg)

		// 		console.log(json);

		// 		msg = '';
		
		// 	} 

		// 	catch (e) {

		// 		msg = '';
		// 	}

		// }

	})


});

server.listen(3215, '192.168.10.1');
