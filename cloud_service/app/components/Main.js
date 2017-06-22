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

  render() {

    var solar;
    var house;
    var motor;
    var enviro;
    var geo;

    if(this.state.solar) {
      solar = <Solar data={this.state.solar} />;
    }

    if(this.state.house) {
      house = <House data={this.state.house} />;
    }

    if(this.state.motor) {
      motor = <Motor data={this.state.motor} />;
    }

    if(this.state.enviro) {
      enviro = <Enviro data={this.state.enviro} />;
    }

    if(this.state.geo) {
      geo = <Geo data={this.state.geo} />;
    }

    return(

      <div className="mainContainer">
{/*
        {house}
        {solar}
        {motor}
        {enviro}
        {geo} */}

        <History selected="solarcurrent"/>

      </div>

    )
  }

}

export default Main;
