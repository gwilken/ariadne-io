import React from "react";
import Test from "./Test";

class Main extends React.Component {

  constructor() {
    super();

    this.state = {
      solar: null
    }

  }

  componentDidMount() {

    var ws = new WebSocket('ws://www.rednightsky.com:8080');

    ws.onmessage = function(event) {

      var msg = JSON.parse(event.data);
      console.log(msg);

      if(msg.name === 'Solar Controller Monitor') {
        this.setState( {solar: msg } );
      }

    }.bind(this);

  }

  render() {

    var solar;
    if(this.state.solar) {

      solar = <Test data={this.state.solar} />;
      
    }

    return(


      <div>

        {solar}

      </div>

    )
  }

}

export default Main;
