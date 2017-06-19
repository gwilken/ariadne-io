var Board = require('firmata');

var automation = {
  type: 'automation',

  runningLights: {
    state: null,
    sensorPin: 5,
    relayPin: 17,
  },
  cabinLights: {
    state: null,
    sensorPin: 6,
    relayPin: 16,
  },
  spreaderLights: {
    state: null,
    sensorPin: 7,
    relayPin: 15,
  },
  vhf: {
    state: null,
    sensorPin: 8,
    relayPin: null,
  },
  bilgePump: {
    state: null,
    sensorPin: 9,
    relayPin: null,
  },
  refrigerator: {
    state: null,
    sensorPin: 10,
    relayPin: null,
  },
  depthSounder: {
    state: null,
    sensorPin: 11,
    relayPin: null,
  },
  gps: {
    state: null,
    sensorPin: 12,
    relayPin: 14
  }
};

// --- Arduino Setup ---

var board = new Board('/dev/ttyUSB2', function() {
});

board.on("ready", function() {

  board.pinMode(automation.runningLights.sensorPin, board.MODES.PULLUP);     //  Running Lights
  board.pinMode(automation.cabinLights.sensorPin, board.MODES.PULLUP);       //  Cabin Lights
  board.pinMode(automation.spreaderLights.sensorPin, board.MODES.PULLUP);    //  Spreader Lights
  board.pinMode(automation.vhf.sensorPin, board.MODES.PULLUP);               //  vhf
  board.pinMode(automation.bilgePump.sensorPin, board.MODES.PULLUP);         //  Bilge Pump
  board.pinMode(automation.refrigerator.sensorPin, board.MODES.PULLUP);      //  Fridge
  board.pinMode(automation.depthSounder.sensorPin, board.MODES.PULLUP);      //  Depth Sounder
  board.pinMode(automation.gps.sensorPin, board.MODES.PULLUP);               //  gps

  board.digitalRead(automation.runningLights.sensorPin, function(value) {
    automation.runningLights.state = value;
  });

  board.digitalRead(automation.cabinLights.sensorPin, function(value) {
    automation.cabinLights.state = value;
  });

  board.digitalRead(automation.spreaderLights.sensorPin, function(value) {
    automation.spreaderLights.state = value;
  });

  board.digitalRead(automation.vhf.sensorPin, function(value) {
    automation.vhf.state = value;
  });

  board.digitalRead(automation.bilgePump.sensorPin, function(value) {
    automation.bilgePump.state = value;
  });

  board.digitalRead(automation.refrigerator.sensorPin, function(value) {
    automation.refrigerator.state = value;
  });

  board.digitalRead(automation.depthSounder.sensorPin, function(value) {
    automation.depthSounder.state = value;
  });

  board.digitalRead(automation.gps.sensorPin, function(value) {
   automation.gps.state = value;
  });

  board.pinMode(14, board.MODES.OUTPUT);  //  gps relay
  board.pinMode(15, board.MODES.OUTPUT);  //  spreader lights relay
  board.pinMode(16, board.MODES.OUTPUT);  //  cabin lights relay
  board.pinMode(17, board.MODES.OUTPUT);  //  running lights relay

  board.digitalWrite(14, board.HIGH);
  board.digitalWrite(15, board.HIGH);
  board.digitalWrite(16, board.HIGH);
  board.digitalWrite(17, board.HIGH);

  console.log('Arduino setup.');
});

module.exports = automation;
