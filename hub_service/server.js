const express = require("express");
const bodyParser = require("body-parser");
const mongo = require("./model/mongo.js");
const routes = require("./routes/expressroutes");

var app = express();

const WebSocket = require('ws');

const ws = new WebSocket('ws://www.rednightsky.com:8080');

ws.on('open', function open() {
  ws.send('something');
});
 
ws.on('message', function incoming(data) {
  console.log(data);
});

var PORT = 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(express.static("./public"));
app.use("/", routes);

//mongo.connect();

app.listen(PORT, function() {
  console.log("Server listening on port", PORT);
});
