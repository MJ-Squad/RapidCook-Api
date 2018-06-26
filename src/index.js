require('newrelic'); // Performance Monitoring using newrelic

const express = require('express');

const i18n = require('i18n');

const logger = require('./logger/log.js');

const path = require('path');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const Raven = require('raven');

const chalk = require('chalk');

require('dotenv').config();

const config = require('./config.js');

const app = express();

// Sentry configuration for error monitoring
Raven.config(config.SENTRY_DSN).install();
app.use(Raven.requestHandler());

// See: https://github.com/mashpie/i18n-node for more options
i18n.configure({
  locales:['en','de'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales')
});

// default: using 'accept-language' header to guess language settings
// See: https://github.com/mashpie/i18n-node
app.use(i18n.init);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

mongoose.connect(config.MONGODB_URI, {
  autoIndex: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}).catch(function(err) {
  console.log(err);
});

const port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log(chalk.yellow.underline('Server up & running on port', port));
});



