import React from "react";
import Solar from "./Solar";
import House from "./House";
import MotorBatteryGroup from "./MotorBatteryGroup";

class Main extends React.Component {

  constructor() {
    super();

    this.state = {
      history: null,
      telemetry: []
    }

    this.didLoad = this.didLoad.bind(this);
    this.getHistory = this.getHistory.bind(this);
  }

  componentWillMount() {
    fetch('/all/60')
      .then((res) => res.json())
        .then((obj) => {
          this.didLoad(obj);
        });

    var ws = new WebSocket('ws://192.168.10.1:8080');

    ws.onmessage = function(event) {
        var telemetry = JSON.parse(event.data);
        console.log(telemetry);
        this.setState({telemetry: telemetry});
    }.bind(this);
  }

  didLoad(obj) {
    this.setState({history: obj});
  }

  getHistory(family, name) {
    return (
       this.state.history
       .map( (item) => item.telemetry )
       .reduce( (acc, cur) => acc.concat(cur))
       .filter( (item) => item.family === family)
       .map ( (item) => item.data )
       .reduce( (acc, cur) => acc.concat(cur))
       .filter( (item) => item.displayName === name)
       .map( (item) => item.data)
     );
  }

  render() {

    var house,
        solar,
        motorbatts,
        display;

    var list = this.state.telemetry.map((elem) => elem.family)

    if(list.includes('house')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'house'});
      house = (
        <div className="component-container">
          <House data={data} color="royalblue" history={this.getHistory}/>
        </div>
      )
    }

    if(list.includes('solar')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'solar'});
      solar = (
        <div className="component-container">
          <Solar data={data} color="gold" history={this.getHistory}/>
        </div>
      )
    }

    if(list.includes('motorbatt')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'motorbatt'});
      motorbatts = (
        <div className="component-container">
          <MotorBatteryGroup data={data} color="darkorange" history={this.getHistory}/>
        </div>
      )
    }

    if(this.state.history) {
      display = (
        <div className="mainContainer">
            {house}
            {solar}
            {motorbatts}
          </div>
        )
    } else display = (<h3>Fetching telemetry...</h3> );

    return (
      <div>
        {display}
      </div>
    )

  }
}
export default Main;
