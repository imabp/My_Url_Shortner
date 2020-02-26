const express    = require('express')
const app        = express()
const mongoose   = require('mongoose')
const config     = require('./config')
const initialize = require('./config/initialize')

// connecting with mongoosejs.
mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const initializer = initialize(app)
initializer.create(config)
initializer.start()
