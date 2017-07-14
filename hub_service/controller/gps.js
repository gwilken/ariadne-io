const net = require("net");
const nmea = require("nmea-simple");

var gps = {
  family: 'gps',
  displayName: "Geospatial",
  data: [{
      sensor: 'position',
      displayName: 'Position',
      data: [null, null]
    },
    {
      sensor: 'speed',
      displayName: 'Speed',
      data: null
    },
    {
      sensor: 'tmg',
      displayName: 'Track Made Good',
      data: null
    },
    {
      sensor: 'siv',
      displayName: "Satellites in View",
      data: null
    }
  ]
}

const gpsSocket = net.connect({port: 10110}, () => {
  console.log('GPS connected via Kplex at port 101110.');
});

gpsSocket.on("data", function(data) {
  try {

    var packet = nmea.parseNmeaSentence(data.toString());

    if (packet.sentenceId === "GGA" && packet.fixType !== "none") {
      gps.data[0].data[0] = packet.latitude;
      gps.data[0].data[1] = packet.longitude;
    };

    if (packet.sentenceId === "RMC" && packet.status === "valid") {
      gps.data[1].data = packet.speedKnots;
      gps.data[2].data = packet.trackTrue;  //Track Made Good
    };

    if (packet.sentenceId === "GSA") {
      gps.data[3].data = packet.satellites.length;   //Satellites In View
    };

  } catch (error) { }   //catch AIS messages that would otherwise break the parser.

});

gpsSocket.on("close", function(data) {
  gps.data[0].data[0] = "Not Availabe";
  gps.data[0].data[1] = "Not Availabe";
  gps.data[1].data = 0;
  gps.data[2].data = "Not Availabe";
  gps.data[3].data = "Not Availabe";
});

gpsSocket.on("error", function(err) {
  console.log('Error on GPS socket:', err);
});


module.exports = gps;
