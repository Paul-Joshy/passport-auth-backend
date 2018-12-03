const express = require('express');
const port = '3000';

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

app.use('/auth', Auth);