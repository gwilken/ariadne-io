
const server = require('http').createServer();
const io = require('socket.io')(server);

server.listen(80);


io.on('connect', (socket) => {

  console.log('connected.');

});

    //
    //
    // ws.on('message', function incoming(data) {
    //
    //   var temp = JSON.parse(data);
    //
    //   console.log(temp);
    //
