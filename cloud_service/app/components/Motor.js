import React from "react";
import RealtimeBar from "./RealtimeBar";
import RealtimeGauge from "./RealtimeGauge";
import History from "./History";
import BatteryBank from "./BatteryBank";
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import {HorizontalBar} from 'react-chartjs-2';

Number.prototype.mapRange = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class Motor extends React.Component {

  constructor(props) {
    super(props);

    this.socClick = this.socClick.bind(this);
    this.ttdClick = this.ttdClick.bind(this);
    this.currentClick = this.currentClick.bind(this);
    this.voltsClick = this.voltsClick.bind(this);
    this.rpmClick = this.rpmClick.bind(this);
  }

  socClick(event) {
    this.props.handleClick({
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[0].displayName,
      unit: this.props.data[0].data[0].unit,
      color: this.props.color
    });
  }

  ttdClick(event) {
    this.props.handleClick({
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[1].displayName,
      unit: this.props.data[0].data[1].unit,
      color: this.props.color
    });
  }

  currentClick(event) {
    this.props.handleClick({
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[2].displayName,
      unit: this.props.data[0].data[2].unit,
      color: this.props.color
    });
  }

  voltsClick(event) {
    this.props.handleClick({
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[3].displayName,
      unit: this.props.data[0].data[3].unit,
      color: this.props.color
    });
  }

  rpmClick(event) {
    this.props.handleClick({
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[4].displayName,
      unit: this.props.data[0].data[4].unit,
      color: this.props.color
    });
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

        <h2>Motor</h2>

          <div className="gaugeContainer">
            <div className="gaugeLeft">

              <RealtimeBar
                data={motorCurrent[0].data}
                title="Current Out"
                realtimedata={motorCurrent[0].data + 'Ah'}
                color={this.props.color}
                handleClick={null}
                range={{low: 0, high: 10}}
              />

              <RealtimeBar
                data={motorTTD[0].data}
                title="Time to Discharge"
                realtimedata={motorTTD[0].data + ' Hours'}
                color={this.props.color}
                handleClick={null}
                range={{low: 0, high: 20}}
              />

            </div>

            <div className="gaugeRight">

              <RealtimeGauge
                data={motorRPM[0].data}
                title="RPM"
                realtimedata={motorRPM[0].data}
                color={this.props.color}
                handleClick={null}
                range={{low: 0, high: 2000}}
              />

            </div>
          </div>

          <RealtimeBar
            data={motorSOC[0].data.mapRange(0,255,0,100)}
            title="State of Charge"
            realtimedata={motorSOC[0].data.mapRange(0,255,0,100) + '%'}
            color={this.props.color}
            handleClick={null}
            range={{low: 0, high: 100}}
          />

          <RealtimeBar
            data={bankVoltage[0].data.toFixed(2)}
            title="Total Bank Voltage"
            realtimedata={bankVoltage[0].data.toFixed(2) + ' V'}
            color={this.props.color}
            handleClick={null}
            range={{low: 46, high: 58}}
          />

        <BatteryBank data={this.props.data} color={this.props.color} />

      </div>
      )
  }
}

export default Motor;
