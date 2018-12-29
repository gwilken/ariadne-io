#!/bin/env node
const config = require('../config.js')
const express = require('express')
const routes = require('./routes')
const redis = require('./redis')
const ws = require('./websocket')

const app = express()

app.use(express.static('../frontend/public'))
app.use('/', routes)

app.listen(config.app.port, function() {
  console.log('Server listening on port', config.app.port)
})
