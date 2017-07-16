const SerialPort = require("serialport");
const mongo = require("../model/mongo.js");
const ObjectID = require('mongodb').ObjectID;
var displayData = Buffer.allocUnsafeSlow(36);
var motorData = Buffer.allocUnsafeSlow(36);

var count = 0;

var motor = {
  family: "motor",
  displayName: "Electric Yacht 10kW Motor",
  data: [
    {
      sensor: "soc",
      displayName: "State of Charge",
      data: null,
      unit: '%'
    },
    {
      sensor: 'ttd',
      displayName: "Time to Discharge",
      data: null,
      unit: 'Hours'
    },
    {
      sensor: 'current',
      displayName: 'Current',
      data: null,
      unit: 'Amps'
    },
    {
      sensor: 'volts',
      displayName: 'Volts',
      data: null,
      unit: 'V'
    },
    {
      sensor: 'rpm',
      displayName: 'RPM',
      data: null
    },
    {
      sensor: 'tempAlarm',
      displayName: 'Temperature Alarm',
      data: null
    }
  ]
}

var motorPort = new SerialPort("/dev/MOTOR", {
  baudRate: 19200,
  parser: SerialPort.parsers.byteLength(36)
});

motorPort.on('open', function() {
  console.log('Motor connected.');
});

motorPort.on('data', function (data) {
  for(var i=0; i<data.length-2;i++){

    if(data[i] === 0 && data[i+1] === 1 && data[i+2] === 255) {

      data.copy(displayData, 0, i);
      motor.data[0].data = displayData[6];
      motor.data[1].data = ((displayData[8] << 8) + displayData[7]) / 10;  //Time To Discharge in xxx.x hours
    };

    if(data[i] === 4 && data[i+1] === 4 && data[i+2] === 1) {

      data.copy(motorData, 0, i);
      motor.data[2].data = ((motorData[9] << 8) + motorData[8]) / 10;
      motor.data[3].data = ((motorData.readUInt8(13) << 8) + motorData.readUInt8(12)) / 100;
      motor.data[4].data = ((motorData[16] << 8) + motorData[15]) / 100;
      motor.data[5].data = motorData[19];
    };

  };

  count++;

  if(count === 60) {
    motor._id = new ObjectID();
    mongo.collection.insert(motor, function(err) {
      if(err) console.log('error at motor mongo insert', err);
      console.log('motor data inserted');
    })
    count = 0;
  }

});

motorPort.on('close', function() {
  motor.data[0].data = 0;
  motor.data[1].data = 0;
  motor.data[2].data = 0;
  motor.data[3].data = 0;
  motor.data[4].data = 0;
  motor.data[5].data = 0;
  console.log('Motor serialport closed.');
});

motorPort.on('error', function(err) {
  console.log('Error on motor serial port:', err);
});

module.exports = motor;
