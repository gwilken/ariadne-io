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
      house = (
        <div className="component-container">
          <House data={data} handleClick={this.setView}/>
        </div>
      )
    }

    if(list.includes('solar')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'solar'});
      solar = (
        <div className="component-container">
          <Solar data={data} handleClick={this.setView}/>
        </div>
      )
    }

    if(list.includes('motor')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'motor'});
      motor = (
        <div className="component-container">
          <Motor data={data} handleClick={this.setView}/>
        </div>
      )
    }

    if(list.includes('enviro')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'enviro'});
      enviro = (
        <div className="component-container">
          <Enviro data={data} handleClick={this.setView}/>
        </div>
      )
    }

    if(list.includes('gps')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'gps'});
      gps = (
        <div className="component-container">
          <Gps data={data} handleClick={this.setView}/>
        </div>
      )
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
           <History view={this.state.view} handleClick={this.setView} />
        </div>
      )

  }
}
export default Main;
