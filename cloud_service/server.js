#!/bin/env node

const express = require("express");
const bodyParser = require("body-parser");
var app = express();

const routes = require("./routes/expressroutes");
const mongo = require("./model/mongo");

var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(express.static("./public"));
app.use("/", routes);

mongo.connect();


require("./controller/websockets");


app.listen(PORT, function() {
  console.log("Server listening on port", PORT);
});
