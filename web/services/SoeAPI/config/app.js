const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      consign = require('consign'),
      cors = require('cors'),
      passport = require('passport'),
      passportConfig = require('./passport')(passport),
      jwt = require('jsonwebtoken'),
      config = require('./index.js'),
      database = require('./database')(mongoose, config);


app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.set('RonSwanson', config.secret);

consign({ cwd: 'services' })
    .include('SoeAPI/app/setup')
    .then('SoeAPI/app/api')
    .then('SoeAPI/app/routes')
    .into(app);

module.exports = app;