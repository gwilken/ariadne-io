import React from "react";
import Solar from "./Solar";
import House from "./House";
import Motor from "./Motor";
import MotorBatteryGroup from "./MotorBatteryGroup";
import Enviro from "./Enviro";
import Gps from "./Gps";

require('../../public/sass/test.scss')

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

    var ws = new WebSocket('ws://www.rednightsky.com:8080');

    ws.onmessage = function(event) {
        var telemetry = JSON.parse(event.data);
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
        enviro,
        gps,
        motor,
        motorbatts,
        display;

    var list = this.state.telemetry.map((elem) => { return elem.family; })

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

    if(list.includes('motor')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'motor'});
      motor = (
        <div className="component-container">
          <Motor data={data} color="firebrick" history={this.getHistory}/>
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

    if(list.includes('enviro')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'enviro'});
      enviro = (
        <div className="component-container">
          <Enviro data={data} color="darkviolet" history={this.getHistory}/>
        </div>
      )
    }

    if(list.includes('gps')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'gps'});
      gps = (
        <div className="component-container">
          <Gps data={data} color="lightseagreen" history={this.getHistory}/>
        </div>
      )
    }

    if(this.state.history) {
      display = (
        <div className="mainContainer">
            {house}
            {solar}
            {enviro}
            {gps}
            {motor}
            {motorbatts}
          </div>
        )
    } else display = (<h3 className='test'>Connecting to telemetry...</h3> );

    return (
      <div>
        {display}
      </div>
    )

  }
}
export default Main;
