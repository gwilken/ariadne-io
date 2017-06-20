const net = require("net");
const nmea = require("nmea-simple");

var gps = {
  family: 'navigation',
  latitude: null,
  longitude: null,
  speed: null,
  tmg: null,
  siv: null
}

const gpsSocket = net.connect({port: 10110}, () => {
  console.log('GPS connected via Kplex at port 101110.');
});

gpsSocket.on("data", function(data) {
  try {

    var packet = nmea.parseNmeaSentence(data.toString());

    if (packet.sentenceId === "RMC" && packet.status === "valid") {

      gps.speed = packet.speedKnots;
      gps.tmg = packet.trackTrue;  //Track Made Good
    };

    if (packet.sentenceId === "GGA" && packet.fixType !== "none") {

      gps.latitude = packet.latitude;
      gps.longitude = packet.longitude;
    };

    if (packet.sentenceId === "GSA") {

      gps.siv = packet.satellites.length;   //Satellites In View
    };

  } catch (error) { }   //catch AIS messages that would otherwise break the parser.

});

gpsSocket.on("close", function(data) {
  gps.latitude = "Not Availabe";
  gps.longitude = "Not Availabe";
  gps.speed = 0;
  gps.lastAverage = 0;
  gps.buffer = [],
  gps.tmg = "Not Availabe";
  gps.siv = "Not Availabe";
});

gpsSocket.on("error", function(err) {
  console.log('Error on GPS socket:', err);
});


module.exports = gps;
