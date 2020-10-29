const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const Logger = require('./services/logger_services');

const logger = new Logger('app');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/electricStoreDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);

app.use((_req, res) => {
  const error = new Error('not found');
  error.status = 404;
  res.status(error.status).send();
  logger.error('not found');
});

app.listen(3000, () => {
  logger.info('APP LAUNCHED IN PORT 3000');
});
