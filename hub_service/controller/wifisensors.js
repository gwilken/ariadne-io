const net = require("net");
const ObjectID = require('mongodb').ObjectID;
const mongo = require("../model/mongo.js");

var packet = {};
var sensor = {};
var count = 0;
var telemetry = [];

const sensorServer = net.createServer(function(socket) {
  socket.on("data", function(data) {
    try {
      packet = JSON.parse(data);
      console.log(packet);
      var list = telemetry.map((elem) => { return elem.displayName; })

      if(list.indexOf(packet.displayName) === -1) {
        telemetry.push(packet);
      }
        else {
          telemetry.splice(list.indexOf(packet.displayName), 1, packet);
        }
    }

    catch(err) {
      console.log('error at wireless sensor', err);
    }

  })
});

sensorServer.listen(3215, '192.168.10.1');

module.exports = telemetry;
