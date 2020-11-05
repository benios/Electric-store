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

const userPermission = (username, orderUser) => {
  if (username !== orderUser) {
    throw new Error('Permission denied!');
  }
};

const getAllOrders = async (req, res) => {
  let foundOrders;
  try {
    foundOrders = await Order.find().exec();
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: err,
    });
  }

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

const getOrder = async (req, res) => {
  const id = req.params.orderId;
  const orderUser = req.userData.username;
  let foundOrder;
  try {
    foundOrder = await Order.findById(id).exec();
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: err,
    });
  }
  if (!foundOrder) {
    return res.status(404).json({
      message: 'order id does not exist',
    });
  }
  try {
    userPermission(foundOrder.userName, orderUser);
  } catch (err) {
    logger.error(err);
    return res.status(400).send(err.message);
  }
  logger.info(`order with ${id} id was fetched`, foundOrder);
  return res.status(200).json({
    message: 'Order details',
    foundOrder,
  });
};

const getOrdersByUsername = async (req, res) => {
  const username = req.params.user;
  const orderUser = req.userData.username;

  try {
    userPermission(username, orderUser);
  } catch (err) {
    logger.error(err);
    return res.status(400).send(err.message);
  }

  let foundOrders;
  try {
    foundOrders = await Order.find({ userName: username }).sort([['date', -1]]).exec();
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
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
};

module.exports = {
  getOrder,
  getAllOrders,
  getOrdersByUsername,
  createOrder,
};
