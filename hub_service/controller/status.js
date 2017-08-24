var Board = require('firmata');

var status = {
  family: 'status',
  displayName: "DC Distribution",
  data: [
    {
      displayName: 'Running Lights',
      state: null
    },
    {
      displayName: 'Cabin Lights',
      state: null
    },
    {
      displayName: 'Spreader Lights',
      state: null
    },
    {
      displayName: 'VHF',
      state: null
    },
    {
      displayName: 'Bilge Pump',
      state: null
    },
    {
      displayName: 'Refrigerator',
      state: null
    },
    {
      displayName: 'Depth Sounder',
      state: null
    },
    {
      displayName: 'GPS',
      state: null
    }]
}

var autoconfig = {
  runningLights: {
    sensorPin: 5,
    relayPin: 17,
  },
  cabinLights: {
    sensorPin: 6,
    relayPin: 16,
  },
  spreaderLights: {
    sensorPin: 7,
    relayPin: 15,
  },
  vhf: {
    sensorPin: 8,
    relayPin: null,
  },
  bilgePump: {
    sensorPin: 9,
    relayPin: null,
  },
  refrigerator: {
    sensorPin: 10,
    relayPin: null,
  },
  depthSounder: {
    sensorPin: 11,
    relayPin: null,
  },
  gps: {
    sensorPin: 12,
    relayPin: 14
  }
};

// --- Arduino Setup ---

var board = new Board('/dev/ttyUSB2', function() {

  board.on("ready", function() {

    board.pinMode(autoconfig.runningLights.sensorPin, board.MODES.PULLUP);     //  Running Lights
    board.pinMode(autoconfig.cabinLights.sensorPin, board.MODES.PULLUP);       //  Cabin Lights
    board.pinMode(autoconfig.spreaderLights.sensorPin, board.MODES.PULLUP);    //  Spreader Lights
    board.pinMode(autoconfig.vhf.sensorPin, board.MODES.PULLUP);               //  vhf
    board.pinMode(autoconfig.bilgePump.sensorPin, board.MODES.PULLUP);         //  Bilge Pump
    board.pinMode(autoconfig.refrigerator.sensorPin, board.MODES.PULLUP);      //  Fridge
    board.pinMode(autoconfig.depthSounder.sensorPin, board.MODES.PULLUP);      //  Depth Sounder
    board.pinMode(autoconfig.gps.sensorPin, board.MODES.PULLUP);               //  gps

    board.digitalRead(autoconfig.runningLights.sensorPin, function(value) {
      status.data[0].state = value;
    });

    board.digitalRead(autoconfig.cabinLights.sensorPin, function(value) {
      status.data[1].state = value;
    });

    board.digitalRead(autoconfig.spreaderLights.sensorPin, function(value) {
      status.data[2].state = value;
    });

    board.digitalRead(autoconfig.vhf.sensorPin, function(value) {
      status.data[3].state = value;
    });

    board.digitalRead(autoconfig.bilgePump.sensorPin, function(value) {
      status.data[4].state = value;
    });

    board.digitalRead(autoconfig.refrigerator.sensorPin, function(value) {
      status.data[5].state = value;
    });

    board.digitalRead(autoconfig.depthSounder.sensorPin, function(value) {
      status.data[6].state = value;
    });

    board.digitalRead(autoconfig.gps.sensorPin, function(value) {
      status.data[7].state = value;
    });

    board.pinMode(14, board.MODES.OUTPUT);  //  gps relay
    board.pinMode(15, board.MODES.OUTPUT);  //  spreader lights relay
    board.pinMode(16, board.MODES.OUTPUT);  //  cabin lights relay
    board.pinMode(17, board.MODES.OUTPUT);  //  running lights relay

    board.digitalWrite(14, board.HIGH);
    board.digitalWrite(15, board.HIGH);
    board.digitalWrite(16, board.HIGH);
    board.digitalWrite(17, board.HIGH);

    console.log('Automation, breaker status ready.');
  });

});

module.exports = status;
