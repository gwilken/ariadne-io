import React from "react";
import History from "./History";
import RealtimeLine from "./RealtimeLine"

class House extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

   var house = this.props.data.filter((elem) => {return elem.displayName === 'House'});
   var volts = null;
   var current = null;

   var fridge = this.props.data.filter((elem) => {return elem.displayName === 'Refrigerator'});
   var beer = null;

   if(house.length > 0) {
     var houseVoltage = house[0].data.filter((elem) => {return elem.sensor === 'voltage'})
     var houseCurrent = house[0].data.filter((elem) => {return elem.sensor === 'current'})

     var volts = (
       <RealtimeLine
        history={this.props.history}
        data={houseVoltage[0].data.toFixed(2)}
        family={this.props.data[0].family}
        displayName={houseVoltage[0].displayName}
        unit={houseVoltage[0].unit}
        color={this.props.color}
        range={{low: 10, high: 14.5}}
      />
     )

     var current = (
       <RealtimeLine
        history={this.props.history}
        data={houseCurrent[0].data.toFixed(2)}
        family={this.props.data[0].family}
        displayName={houseCurrent[0].displayName}
        unit={houseCurrent[0].unit}
        color={this.props.color}
        range={{low: 0, high: 7500}}
       />
     )
   }

   if(fridge.length > 0) {
    var data = fridge[0].data.filter((elem) => {return elem.displayName === 'Beer Temperature'});
    var displayName = data[0].displayName;

    beer = (
      <RealtimeLine
       history={this.props.history}
       data={data[0].data.toFixed(2)}
       family={this.props.data[0].family}
       displayName={displayName}
       unit={'F'}
       color={this.props.color}
       range={{low: 32, high: 100}}
      />
    )
  }

    return (

      <div>

        <h2>House</h2>

        <div className="family-container">

          {volts}
          {current}
          {beer}

        </div>

      </div>
    )
  }
}

export default House;
