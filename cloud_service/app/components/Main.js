import React from "react";
import Test from "./Test";
import Solar from "./Solar";
import House from "./House";
import Motor from "./Motor";
import Enviro from "./Enviro";
import Geo from "./Geo";
import History from "./History";

class Main extends React.Component {

  constructor() {
    super();

    this.state = {
      view: 'all',
      selected: {
        name: 'House Battery Bank',
        field: 'current',
      },
      color: '',
      solar: null,
      house: null,
      enviro: null,
      geo: null,
      motor: {
        ey: null,
        batt1: null,
        batt2: null,
        batt3: null,
        batt4: null
      }
    }

    this.setView = this.setView.bind(this);
    this.gotoHistory = this.gotoHistory.bind(this);

  }

  componentDidMount() {

    var ws = new WebSocket('ws://www.rednightsky.com:8080');

    ws.onmessage = function(event) {

      var msg = JSON.parse(event.data);

      //console.log(msg);

      if(msg.name === 'House Battery Bank') {
        this.setState( {house: msg } );
      }

      if(msg.name === 'Solar Controller Monitor') {
        this.setState( {solar: msg } );
      }

      if(msg.name === 'Motor Battery #1') {
        var obj = {};
        this.setState( { motor: Object.assign( {}, this.state.motor, { batt1: msg } ) } );
        //console.log('motor 1 state', this.state.motor);
      }

      if(msg.name === 'Motor Battery #2') {
        var obj = {};
        this.setState( { motor: Object.assign( {}, this.state.motor, {batt2: msg} ) } );
      }

      if(msg.name === 'Motor Battery #3') {
        var obj = {};
        this.setState( { motor: Object.assign( {}, this.state.motor, {batt3: msg} ) } );
      }

      if(msg.name === 'Motor Battery #4') {
        var obj = {};
        this.setState( { motor: Object.assign( {}, this.state.motor, {batt4: msg} ) } );
      }

      if(msg.name === 'Electric Yacht 10kW Motor') {
        var obj = {};
  //      console.log('at main: ', msg);
        this.setState( { motor: Object.assign( {}, this.state.motor, {ey: msg} ) } );
      }

      if(msg.family === 'Environmental') {
        var obj = {};
        //console.log('at main: ', msg);
        this.setState( { enviro: msg } );
      }

      if(msg.family === 'navigation') {
        var obj = {};
        //console.log('at main: ', msg);
        this.setState( { geo: msg } );
      }

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

    var content;
    var solar;
    var house;
    var motor;
    var enviro;
    var geo;

    if(this.state.solar) {
      solar = (
        <div onClick={ () => this.gotoHistory( { name: "Solar Controller Monitor" , field: "busvoltage" }, 'gold')} >
          <Solar data={this.state.solar} />
        </div>
      )
    }

    if(this.state.house) {
      <div onClick={ () => this.gotoHistory( { name: "House Battery Bank" , field: "current" }, 'royalblue')} >
        house = <House data={this.state.house} />
      </div>
    }

    if(this.state.motor) {
      <div onClick={ () => this.gotoHistory( { name: "Electric Yacht 10kW Motor" , field: "volts" }, 'firebrick')} >
        motor = <Motor data={this.state.motor} />
      </div>
    }

    if(this.state.enviro) {
      <div onClick={ () => this.gotoHistory( { name: "Environmental" , field: "temperature" }, 'darkviolet')} >
        enviro = <Enviro data={this.state.enviro} />
      </div>
    }

    if(this.state.geo) {
      <div onClick={ () => this.gotoMap} >
        geo = <Geo data={this.state.geo} />
      </div>
    }

    if(this.state.view === 'history') {

      return (

        <div className="mainContainer">
          <History selected={this.state.selected} color={this.state.color} setView={this.setView}/>
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
