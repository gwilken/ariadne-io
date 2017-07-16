import React from "react";
import Test from "./Test";
import Solar from "./Solar";
import House from "./House";
import Motor from "./Motor";
import Enviro from "./Enviro";
import Geo from "./Geo";
import History from "./History";
import HistoryDuo from "./HistoryDuo";


class Main extends React.Component {

  constructor() {
    super();

    this.state = {
      view: 'all',
      selected: {
        name: '',
        field1: '',
        field2: ''
      },
      color: 'blue',
      telemetry: []
    }

    this.setView = this.setView.bind(this);
    this.gotoHistory = this.gotoHistory.bind(this);

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

  gotoHistory(selected, color) {
    console.log(selected);
    this.setState({
      view: 'history',
      color: color,
      selected: selected
     });
  }

  gotoMap() {

  }

  render() {

    var list = this.state.telemetry.map((elem) => { return elem.family; })

    var content;
    var solar;
    var house;
    var motor;
    var enviro;
    var geo;

    if(list.includes('solar')) {
      console.log('solar at main');

      var data = this.state.telemetry.map((elem) => {return elem.family = 'solar'});

      solar = (
        <div >
          <Test data={data} />
        </div>
      )
    }

    // if(list.includes('solar')) {
    //   console.log('solar');
    //
    //   var data = this.state.telemetry.map((elem) => {return elem.family = 'solar'});
    //
    //   solar = (
    //     <div onClick={ () => this.gotoHistory( { name: "Solar Controller Monitor" , field1: "current", field2: "busvoltage" }, 'gold')} >
    //       <Solar data={data} />
    //     </div>
    //   )
    // }

    // if(this.state.house) {
    //   house = (
    //     <div onClick={ () => this.gotoHistory( { name: "House Battery Bank" , field1: "current", field2: "busvoltage" }, 'royalblue')} >
    //        <House data={this.state.house} />
    //     </div>
    //   )
    // }
    //
    // if(this.state.motor) {
    //   motor = (
    //     <div onClick={ () => this.gotoHistory( { name: "Electric Yacht 10kW Motor" , field1: "volts", field2: "current" }, 'firebrick')} >
    //       <Motor data={this.state.motor} />
    //     </div>
    //   )
    // }
    //
    // if(this.state.enviro) {
    //   enviro = (
    //     <div onClick={ () => this.gotoHistory( { name: "Environmental" , field1: "temperature", field2: "pressure" }, 'darkviolet')} >
    //       <Enviro data={this.state.enviro} />
    //     </div>
    //   )
    // }
    //
    // if(this.state.geo) {
    //   geo = (
    //     <div onClick={ () => this.gotoMap} >
    //       <Geo data={this.state.geo} />
    //     </div>
    //   )
    // }

    if(this.state.view === 'history') {

      return (

        <div className="mainContainer">
          <HistoryDuo selected={this.state.selected} color={this.state.color} setView={this.setView}/>
        </div>

      )

      } else {

        if(this.state.view === 'all') {

          return (
            <div className="mainContainer">
                    {house}
                    {solar}
                    {motor}
                    {enviro}
                    {geo}
            </div>
          )
        }
      }
    }
}
export default Main;
