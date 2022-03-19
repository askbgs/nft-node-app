const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

const mongoose = require('mongoose')

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var query = "mongodb+srv://nodeadmin:19Google198110@para-shop-app.glhlm.mongodb.net/para-shop-app?retryWrites=true&w=majority";
const db_url = (query);
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
  if (err) {
    console.error(err)
 }
 else {
  console.log('Database connected')
 }
});

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
