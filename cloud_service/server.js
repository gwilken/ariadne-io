#!/bin/env node

const express = require("express");
const bodyParser = require("body-parser");
var app = express();

const routes = require("./routes/expressroutes");
const mongo = require("./model/mongo");

var PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(express.static("./public"));
app.use("/", routes);

require("./controller/websockets");

mongo.connect();

app.listen(PORT, function() {
  console.log("Server listening on port", PORT);
});
