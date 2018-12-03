const express = require('express');
const passport = require('passport');
const port = '3000';
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.listen(port, () => console.log(`Server listening on port ${port}!`))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database Connected");
  // we're connected!
});

// const router = app.router();

app.get('/', (req,res) => {
    res.send('App router works!');
})

const Auth = require('./features/auth/auth.routes');

app.use(bodyParser.json())
app.use(session({
    secret: 'thesecret',
    saveUninitialized: false,
    resave: false
}))

app.use('/auth', Auth);