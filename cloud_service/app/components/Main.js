import React from "react";
import WebSocket from 'ws';
import mongo from "../../model/mongo.js";

class Main extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on('connection', function connection(ws) {

      ws.on('message', function incoming(packet) {

        var data = JSON.parse(packet);

        console.log(data);

      });

    });
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
