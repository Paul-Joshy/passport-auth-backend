const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./services/passport')

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/APIAuthenticationTEST', { useMongoClient: true });
} else {
  mongoose.connect('mongodb://localhost/APIAuthentication', { useMongoClient: true });
}

const app = express();
app.use(cors());

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

const Auth = require('./features/auth/auth.routes.js');
const Users = require('./features/users/users.routes');

// Routes
app.use('/auth', Auth);
app.use('/user', passport.authenticate('jwt', { session: false }), Users)

module.exports = app;
