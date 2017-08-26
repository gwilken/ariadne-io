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

    return (

      <div>

        <h2>Electric Motor</h2>

          <RealtimeLine
            data={bankVoltage[0].data}
            family={this.props.data[0].family}
            displayName={this.props.data[0].data[3].displayName}
            unit={this.props.data[0].data[3].unit}
            color={this.props.color}
            range={{low: 46, high: 58}}
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

      </div>
      )
  }
}

export default Motor;
