const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/expressroutes");
var app = express();

require("./controller/socketListen");

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
