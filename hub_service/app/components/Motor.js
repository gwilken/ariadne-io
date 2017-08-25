import React from "react";
import RealtimeLine from "./RealtimeLine";

Number.prototype.mapRange = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class Motor extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var motorData = this.props.data.filter((elem) => {return elem.displayName === 'Electric Yacht 10kW Motor'});

    if(motorData.length > 0) {
      var bankVoltage = motorData[0].data.filter((elem) => {return elem.sensor === "volts"});
      var motorSOC = motorData[0].data.filter((elem) => {return elem.sensor === "soc"});
      var motorCurrent = motorData[0].data.filter((elem) => {return elem.sensor === "current"});
      var motorTTD = motorData[0].data.filter((elem) => {return elem.sensor === "ttd"});
      var motorRPM = motorData[0].data.filter((elem) => {return elem.sensor === "rpm"});
    }

    var batt1Data = this.props.data.filter((elem) => {return elem.displayName === "Battery 1"});

    if(batt1Data.length > 0) {
      var batt1Volts = batt1Data[0].data.filter((elem) => {return elem.sensor === "voltage"});
    }


   if(batt1Data.length > 0) {

     console.log(batt1Volts[0].data);
     console.log(this.props.data[0].family);
     console.log(batt1Data[0].displayName);
     console.log(batt1Data[0].unit);

   }

  //  console.log(batt1Data[0].displayName);

    // if(batt1Data.length > 0) {
    //   var batt1Volts = [];
    //   batt1Volts.push(batt1Data[0].data[0].data);
    //
    //
    // }



  //  var battery1 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 1'});
    // var battery2 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 2'});
    // var battery3 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 3'});
    // var battery4 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 4'});

    //console.log(battery1[0].data.length);
    //
    // if(battery1[0].data.length > 0) {
    //   batt1 = (
    //             <RealtimeLine
    //               data={battery1[0].data}
    //               family={battery1[0].family}
    //               displayName={battery1[0].displayName}
    //               unit={battery1[0].data[0].unit}
    //               color={this.props.color}
    //               range={{low: 10, high: 14.5}}
    //             />)
    // }

    //  (battery1.length > 0) ? battery1_volts = battery1[0].data[0].data.toFixed(2) : battery1_volts = 0;

    // if(battery2.length > 0) var battery2_volts = battery2[0].data[0].data.toFixed(2);
    // if(battery3.length > 0) var battery3_volts = battery3[0].data[0].data.toFixed(2);
    // if(battery4.length > 0) var battery4_volts = battery4[0].data[0].data.toFixed(2);


    return (

      <div>

        <h2>Motor</h2>

          <RealtimeLine
            data={bankVoltage[0].data}
            family={this.props.data[0].family}
            displayName={this.props.data[0].data[3].displayName}
            unit={this.props.data[0].data[3].unit}
            color={this.props.color}
            range={{low: 46, high: 58}}
          />

          <RealtimeLine
            data={batt1Volts[0].data}
            family={this.props.data[0].family}
            displayName={batt1Data[0].displayName}
            unit={batt1Data[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeLine
            data={motorCurrent[0].data}
            family={this.props.data[0].family}
            displayName={this.props.data[0].data[2].displayName}
            unit={this.props.data[0].data[2].unit}
            color={this.props.color}
            range={{low: 0, high: 10}}
          />

          <RealtimeLine
            data={motorRPM[0].data}
            family={this.props.data[0].family}
            displayName={this.props.data[0].data[4].displayName}
            unit={this.props.data[0].data[4].unit}
            color={this.props.color}
            range={{low: 0, high: 2000}}
          />

          <RealtimeLine
            data={motorTTD[0].data}
            family={this.props.data[0].family}
            displayName={this.props.data[0].data[1].displayName}
            unit={this.props.data[0].data[1].unit}
            color={this.props.color}
            range={{low: 0, high: 20}}
          />

          <RealtimeLine
            data={motorSOC[0].data.mapRange(0,255,0,100)}
            family={this.props.data[0].family}
            displayName={this.props.data[0].data[0].displayName}
            unit={this.props.data[0].data[0].unit}
            color={this.props.color}
            range={{low: 0, high: 100}}
          />



        {/* <BatteryBank data={this.props.data} color={this.props.color} /> */}

      </div>
      )
  }
}

export default Motor;
