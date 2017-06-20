const express = require("express");
const bodyParser = require("body-parser");
//const mongo = require("./model/mongo.js");
const routes = require("./routes/expressroutes");

var app = express();

//require("./controller/socketListen");

//var PORT = process.env.PORT || 80;

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});



var PORT = 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(express.static("./public"));
//app.use("/", routes);

//mongo.connect();

app.listen(PORT, function() {
  console.log("Server listening on port", PORT);
});
