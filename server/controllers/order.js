const express = require('express');
const bodyParser = require('body-parser');
const Order = require('../model/order');
const emailNotification = require('../services/email_services');
const Logger = require('../services/logger_services');

const app = express();

const logger = new Logger('app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const newOrderValidation = (order) => {
  if (!order.userName) {
    throw new Error('username field is empty');
  }
  if (!order.product) {
    throw new Error('product field is empty');
  }
};

const getAllOrders = (req, res) => {
  Order.find()
    .exec()
    .then((foundOrders) => {
      if (!foundOrders) {
        return res.status(404).json({
          message: 'There are no orders to fetch',
        });
      }
      logger.info('Fetching all orders');
      return res.status(200).json({
        message: 'Orders details',
        foundOrders,
      });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({
        message: err,
      });
    });
};

const createOrder = (req, res) => {
  const { body } = req;
  const order = new Order({
    userName: body.userName,
    product: body.product,
    date: Date.now(),
  });

  order.save();

  logger.info('creating an order', order);

  try {
    newOrderValidation(order);
  } catch (err) {
    logger.error(err, order);
    return res.status(400).send('Error: creating a new order failed');
  }

  logger.info('Orders were created', order);
  const strOrder = JSON.stringify(order);
  const subject = 'New order';
  const text = 'A new order has been created';
  emailNotification.emailNotification(strOrder, subject, text);
  return res.send('Orders were created');
};

const getOrder = (req, res) => {
  const id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then((foundOrder) => {
      if (!foundOrder) {
        return res.status(404).json({
          message: 'order id does not exist',
        });
      }
      logger.info(`order with ${id} id was fetched`, foundOrder);
      return res.status(200).json({
        message: 'Order details',
        foundOrder,
      });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({
        message: err,
      });
    });
};

const getOrdersByUsername = (req, res) => {
  const username = req.params.user;
  Order.find({ userName: username }).sort([['date', -1]])
    .exec()
    .then((foundOrders) => {
      if (!foundOrders) {
        return res.status(404).json({
          message: 'There are no orders to fetch',
        });
      }
      logger.info('Fetching all orders');
      return res.status(200).json({
        message: 'Orders details',
        foundOrders,
      });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({
        message: err,
      });
    });
};

module.exports = {
  getOrder,
  getAllOrders,
  getOrdersByUsername,
  createOrder,
};
