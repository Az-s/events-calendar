const express = require('express');
const cors = require('cors');
const events = require('./app/events');
const users = require('./app/users');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const config = require('./config');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const port = 8000;

app.use('/events', events);
app.use('/users', users);

const run = async () => {
  await mongoose.connect(config.db.url);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  exitHook(() => {
    console.log('exiting');
    mongoose.disconnect();
  });
};

run().catch(e => console.error(e));