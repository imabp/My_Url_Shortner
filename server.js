const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config");
const initialize = require("./config/initialize");

// connecting with mongoosejs.
mongoose.connect("REPLACE_WITH_YOUR_OWN_MONGO_URL", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const initializer = initialize(app);
initializer.create(config);
initializer.start();
