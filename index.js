//   modules
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const main = require('./routes/main');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

app.set('view engine', 'pug');

//   middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

//   ROUTE middleware
app.use('/api/routes', genres);
app.use('/', main);

//   CONFIG
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail PW: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
};

dbDebugger('connected to database');

//   custom middleware
app.use(logger);
app.use(auth);

//   VALIDATION using Joi for new genres
const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(3).required(),
  }

  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on port ${port}...`);
})