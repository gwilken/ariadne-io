const SerialPort = require("serialport");

var displayData = Buffer.allocUnsafeSlow(36);
var motorData = Buffer.allocUnsafeSlow(36);

var motor = {
  family: "Motor",
  name: "Electric Yacht 10kW Motor",
  id: 9,
  soc: null,
  ttd: null,
  current: null,
  volts: null,
  rpm: null,
  tempAlarm: null
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
      motor.soc = displayData[6];
      motor.ttd = ((displayData[8] << 8) + displayData[7]) / 10;  //Time To Discharge in xxx.x hours
    };

    if(data[i] === 4 && data[i+1] === 4 && data[i+2] === 1) {

      data.copy(motorData, 0, i);
      motor.current = ((motorData[9] << 8) + motorData[8]) / 10;
      motor.volts = ((motorData.readUInt8(13) << 8) + motorData.readUInt8(12)) / 100;
      motor.rpm = round(((motorData[16] << 8) + motorData[15]) / 100, 0);
      motor.tempAlarm = motorData[19];
    };

  };
});

motorPort.on('close', function() {
  motor.status = 0;
  motor.current = 0;
  motor.volts = 0;
  motor.rpm = 0;
  motor.power = 0;
  motor.soc = 0;
  motor.ttd = 0;

  console.log('Motor serialport closed.');
});

motorPort.on('error', function(err) {
  console.log('Error on motor serial port:', err);
});

module.exports = motor;
