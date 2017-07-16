import React from "react";
import Test from "./Test";
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
      this.setState({telemetry: event.data});
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
    var gps;


    if(list.includes('house')) {
      var data = this.state.telemetry.filter((elem) => {return elem.family === 'house'});

      house = (
        <div onClick={ () => this.gotoHistory('gold') } >
          <House data={data} />
        </div>
      )
    }
    //
    // if(list.includes('solar')) {
    //   var data = this.state.telemetry.filter((elem) => {return elem.family === 'solar'});
    //
    //   solar = (
    //     <div onClick={ () => this.gotoHistory('gold') } >
    //       <Solar data={data} />
    //     </div>
    //   )
    // }
    //
    // if(list.includes('motor')) {
    //   var data = this.state.telemetry.filter((elem) => {return elem.family === 'motor'});
    //
    //   motor = (
    //     <div onClick={ () => this.gotoHistory('gold') } >
    //       <Motor data={data} />
    //     </div>
    //   )
    // }
    //
    // if(list.includes('enviro')) {
    //   var data = this.state.telemetry.filter((elem) => {return elem.family === 'enviro'});
    //
    //   enviro = (
    //     <div onClick={ () => this.gotoHistory('gold') } >
    //       <Enviro data={data} />
    //     </div>
    //   )
    // }
    //
    // if(list.includes('gps')) {
    //   var data = this.state.telemetry.filter((elem) => {return elem.family === 'gps'});
    //
    //   gps = (
    //     <div onClick={ () => this.gotoHistory('gold') } >
    //       <Gps data={data} />
    //     </div>
    //   )
    // }

      // if(this.state.enviro) {
    //   enviro = (
    //     <div onClick={ () => this.gotoHistory( { name: "Environmental" , field1: "temperature", field2: "pressure" }, 'darkviolet')} >
    //       <Enviro data={this.state.enviro} />
    //     </div>
    //   )
    // }
    //


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
                    {gps}
            </div>
          )
        }
      }
    }
}
export default Main;
