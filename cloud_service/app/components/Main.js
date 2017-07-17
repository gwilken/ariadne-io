import React from "react";
import Solar from "./Solar";
import House from "./House";
import Motor from "./Motor";
import Enviro from "./Enviro";
import Gps from "./Gps";
import History from "./History";
import HistoryDuo from "./HistoryDuo";

class Main extends React.Component {

  constructor() {
    super();

    this.state = {
      view: {
        family: 'all'
      },
      telemetry: []
    }

    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    var ws = new WebSocket('ws://www.rednightsky.com:8080');

    ws.onmessage = function(event) {
      var telemetry = JSON.parse(event.data);
      this.setState({telemetry: telemetry});
    }.bind(this);
  }

  setView(newView) {
    this.setState({
      view: newView
    });
    console.log(newView);
  }

  render() {

    var house,
        solar,
        motor,
        enviro,
        gps;

    var list = this.state.telemetry.map((elem) => { return elem.family; })

    if(list.includes('house')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'house'});
      house = ( <House data={data} handleClick={this.setView}/> )
    }

    if(list.includes('solar')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'solar'});
      solar = ( <Solar data={data} handleClick={this.setView}/> )
    }

    if(list.includes('motor')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'motor'});
      motor = ( <Motor data={data} handleClick={this.setView}/> )
    }

    if(list.includes('enviro')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'enviro'});
      enviro = ( <Enviro data={data} handleClick={this.setView}/> )
    }

    if(list.includes('gps')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'gps'});
      gps = ( <Gps data={data} handleClick={this.setView}/> )
    }

    if(this.state.view.family === 'all') {
      return (
        <div className="mainContainer">
          {house}
          {solar}
          {gps}
          {motor}
          {enviro}
        </div>
      )
    } else

      return (
        <div className="mainContainer">
           <History view={this.state.view} />
        </div>
      )
  }
}
export default Main;
