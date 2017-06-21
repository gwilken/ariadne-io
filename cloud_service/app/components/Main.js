import React from "react";
import Test from "./Test";

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

    }.bind(this);

  }

  render() {

    var solar;
    var house;

    if(this.state.solar) {
      solar = <Test data={this.state.solar} />;
    }

    if(this.state.house) {
      house = <Test data={this.state.house} />;
    }


    return(


      <div>

        {solar}
        {house}

      </div>

    )
  }

}

export default Main;
