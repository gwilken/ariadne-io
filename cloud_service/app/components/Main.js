import React from "react";

class Main extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    var ws = new WebSocket('ws://www.rednightsky.com');

    ws.onmessage = function (event) {

      var msg = JSON.parse(event);
      console.log(msg);

    }

  }

  render() {
    return(

      <div>

        <h1 className="search-title"> Rendered </h1>

      </div>

    )
  }

}

export default Main;
