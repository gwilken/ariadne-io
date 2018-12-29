const config = require('../config.js')
const redis = require('redis')
const redisClient = redis.createClient(config.redis.port, config.redis.host)

redisClient.on('error', err => {
  console.log('Redis Error:', err)
});

redisClient.on('connect', () => {
  console.log('Connected to Redis succesfully.')
});

redisClient.on('ready', () => {
  console.log('Redis Ready.')
});

module.exports = redisClient
