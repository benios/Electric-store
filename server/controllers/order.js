const express = require('express');
const bodyParser = require('body-parser');
const orderModel = require('../model/order');
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
  const ordersList = orderModel.getAllOrders();
  logger.info('Orders were fetched', ordersList);
  return res.status(200).json({
    message: 'Orders were fetched',
    ordersList,
  });
};

const createOrder = (req, res) => {
  const { body } = req;
  const order = {
    userName: body.userName,
    product: body.product,
    date: Date.now(),
  };

  logger.info('creating an order', order);

  try {
    newOrderValidation(order);
  } catch (err) {
    logger.error(err, order);
    return res.status(400).send('Error: creating a new order failed');
  }

  orderModel.createOrder(order);
  logger.info('Orders were created', order);
  const strOrder = JSON.stringify(order);
  const subject = 'New order';
  const text = 'A new order has been created';
  emailNotification.emailNotification(strOrder, subject, text);
  return res.send('Orders were created');
};

const getOrder = (req, res) => {
  const id = Number(req.params.orderId);
  const order = orderModel.getOrder(id);
  if (!order) {
    return res.status(404).json({
      message: 'order id does not exist',
    });
  }
  logger.info(`order with ${id} id was fetched`, order);
  return res.status(200).json({
    message: 'Order details',
    order,
  });
};
const getOrdersByUsername = (req, res) => {
  const username = req.params.user;
  logger.info('fetching users orders');
  const usersOrders = orderModel.getOrdersByUsername(username);
  if (!usersOrders) {
    return res.status(404).json({
      message: 'username does not exist',
    });
  }
  logger.info(`orders of username:${username}has been fetched`, usersOrders);
  return res.status(200).json({
    message: `orders of username:${username}has been fetched`,
    usersOrders,
  });
};

module.exports = {
  getOrder,
  createOrder,
  getAllOrders,
  getOrdersByUsername,
};
