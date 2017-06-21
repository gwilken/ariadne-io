import React from "react";
import Test from "./Test";
import Solar from "./Solar";
import House from "./House";

class Main extends React.Component {

  constructor() {
    super();

    this.state = {
      solar: null,
      house: null
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

    }.bind(this);

  }

  render() {

    var solar;
    var house;

    if(this.state.solar) {
      solar = <Solar data={this.state.solar} />;
    }

    if(this.state.house) {
      house = <House data={this.state.house} />;
    }


    return(


      <div className="mainContainer">

        {house}
        {solar}


      </div>

    )
  }

}

export default Main;
