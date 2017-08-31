import React from "react";
import History from "./History";
import RealtimeLine from "./RealtimeLine"

class House extends React.Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.log(this.props.history());
  // }

  render() {

   var house = this.props.data.filter((elem) => {return elem.displayName === 'House'});
   var houseVoltage = house[0].data.filter((elem) => {return elem.sensor === 'voltage'})
   var houseCurrent = house[0].data.filter((elem) => {return elem.sensor === 'current'})
   var fridge = this.props.data.filter((elem) => {return elem.displayName === 'Refrigerator'});

   var beer = null;

   if(fridge.length > 0) {
    var data = fridge[0].data.filter((elem) => {return elem.displayName === 'Beer Temperature'});
    var displayName = beer[0].displayName;

    beer = (
      <RealtimeLine
       history={this.props.history}
       data={data}
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

           <RealtimeLine
            history={this.props.history}
            data={houseVoltage[0].data.toFixed(2)}
            family={this.props.data[0].family}
            displayName={houseVoltage[0].displayName}
            unit={houseVoltage[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeLine
           history={this.props.history}
           data={houseCurrent[0].data.toFixed(2)}
           family={this.props.data[0].family}
           displayName={houseCurrent[0].displayName}
           unit={houseCurrent[0].unit}
           color={this.props.color}
           range={{low: 0, high: 7500}}
          />

          {beer}

        </div>

      </div>
    )
  }
}

export default House;
