// Set up express 🚀
const express = require('express')

// Set up routes and middeware 🏇
const foodRouter =require('../routers/foodRouter')
const helmet = require('helmet')
const morgan = require('morgan')

// Set up MOTD 💬
const messageOfTheDay = process.env.MOTD || 'Hello, world! Welcome to my keto macro calculator API!'

// Enable express on server 🚀
const server = express()

// Enable routes and middleware 🐎
server.use(morgan('dev'))
server.use(logger)
server.use(express.json())
server.use('/api/food', foodRouter)
server.use(helmet())

// Enable MOTD 💬
server.get("/", (req, res) => {
  res.send(`<h2>${messageOfTheDay}</h2>`)
})

/* 🔥 Custom middleware 🔥 */
function logger(req, res, next) {
  console.log(`${req.method} request received`)
  next()
}

// Export server 🚀
module.exports = server