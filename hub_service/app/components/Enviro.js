import React from "react";
import RealtimeLine from "./RealtimeLine";

class Enviro extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var temp = this.props.data[0].data[0].data.toFixed(2);
    var humidity = this.props.data[0].data[1].data.toFixed(2);
    var pressure = this.props.data[0].data[2].data.toFixed(2);
    var windSpeed = this.props.data[0].data[3].data.toFixed(2);

  //  var tempF = temp * 9/5 + 32;
  //  var tempDisplay = tempF.toFixed(2) + '\u00B0' + ' F' ;

    if(windSpeed < 0) windSpeed = 0;

    var windKnots = (windSpeed * 1.943844).toFixed(2);

  return (
    <div>

      <h2>Environmental</h2>

      <div>

        <RealtimeLine
          history={this.props.history}
          data={windKnots}
          family={this.props.data[0].family}
          displayName={this.props.data[0].data[3].displayName}
          unit={this.props.data[0].data[3].unit}
          color={this.props.color}
          range={{low: 0, high: 32}}
        />

        <RealtimeLine
          history={this.props.history}
          data={temp}
          family={this.props.data[0].family}
          displayName={this.props.data[0].data[0].displayName}
          unit={this.props.data[0].data[0].unit}
          color={this.props.color}
          range={{low: 0, high: 50}}
        />

        <RealtimeLine
          history={this.props.history}
          data={humidity}
          family={this.props.data[0].family}
          displayName={this.props.data[0].data[1].displayName}
          unit={this.props.data[0].data[1].unit}
          color={this.props.color}
          range={{low: 0, high: 100}}
        />

        <RealtimeLine
          history={this.props.history}
          data={pressure}
          family={this.props.data[0].family}
          displayName={this.props.data[0].data[2].displayName}
          unit={this.props.data[0].data[2].unit}
          color={this.props.color}
          range={{low: 300, high: 1100}}
        />

      </div>
    </div>
  )
  }
}
export default Enviro;
