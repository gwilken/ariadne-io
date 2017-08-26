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
   var houseVoltage = house[0].data.filter((elem) => {return elem.sensor === 'voltage'})
   var houseCurrent = house[0].data.filter((elem) => {return elem.sensor === 'current'})

   var fridge = this.props.data.filter((elem) => {return elem.displayName === 'Refrigerator'});
   var beer = fridge[0].filter((elem) => {return elem.displayName === 'Beer Temperature'});


//    var volts = this.props.data.filter((elem) => {return elem.sensor === 'voltage'});
    //var volts = this.props.data[0].data[0].data.toFixed(2);
  //  var current = this.props.data[0].data[1].data.toFixed(0);

  //  if(this.props.data) console.log(this.props.data);
  //  if(fridge) console.log(fridge);
  //  if(houseVoltage) console.log(houseVoltage);


    return (

      <div>

        <h2>House</h2>

        <div className="family-container">

           <RealtimeLine
            data={houseVoltage[0].data.toFixed(2)}
            family={this.props.data[0].family}
            displayName={houseVoltage[0].displayName}
            unit={houseVoltage[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeLine
           data={houseCurrent[0].data.toFixed(2)}
           family={this.props.data[0].family}
           displayName={houseCurrent[0].displayName}
           unit={houseCurrent[0].unit}
           color={this.props.color}
           range={{low: 0, high: 7500}}
          />

          <RealtimeLine
           data={beer[0].data.toFixed(2)}
           family={this.props.data[0].family}
           displayName={beer[0].displayName}
           unit={beer[0].unit}
           color={this.props.color}
           range={{low: 32, high: 100}}
          />

        </div>

      </div>
    )
  }
}

export default House;
