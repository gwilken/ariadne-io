import React from "react";
import RealtimeBar from "./RealtimeBar";
import History from "./History";
import RealtimeLine from "./RealtimeLine"

class House extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

   var house = this.props.data.filter((elem) => {return elem.displayName === 'House'});
   var fridge = this.props.data.filter((elem) => {return elem.displayName === 'Refrigerator'});

   var houseVoltage = house[0].data.filter((elem) => {return elem.sensor === 'voltage'})
//    var volts = this.props.data.filter((elem) => {return elem.sensor === 'voltage'});
    //var volts = this.props.data[0].data[0].data.toFixed(2);
  //  var current = this.props.data[0].data[1].data.toFixed(0);

  //  if(this.props.data) console.log(this.props.data);
  //  if(fridge) console.log(fridge);
    if(houseVoltage) console.log(houseVoltage);


    return (

      <div>

        <h2>House</h2>

        <div className="family-container">

          {/* <RealtimeLine
            data={volts[0].data[0].data.toFixed(2)}
            family={this.props.data[0].family}
            displayName={volts[0].data[0].displayName}
            unit={volts[0].data[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeLine
            data={current}
            family={this.props.data[0].family}
            displayName={this.props.data[0].data[1].displayName}
            unit={this.props.data[0].data[1].unit}
            color={this.props.color}
            range={{low: 0, high: 7500}}
          /> */}

        </div>

      </div>
    )
  }
}

export default House;
