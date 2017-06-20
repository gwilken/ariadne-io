const express = require("express");
const bodyParser = require("body-parser");
const mongo = require("./model/mongo.js");
const routes = require("./routes/expressroutes");

var app = express();

//require("./controller/hub")(app);

var io = require('socket.io-client')
var socket = io.connect('http://www.rednightsky.com', {reconnect: true});

console.log('2');

// Add a connect listener
socket.on('connect', function(socket) {
    console.log('Connected!');
});

socket.emit('test', 'tobi', function (data) {
  console.log(data); // data will be 'woot'
});
//var PORT = process.env.PORT || 80;

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
