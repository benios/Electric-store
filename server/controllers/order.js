const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const orderModel = require('../model/order');
const utils = require('../utils/utils');

const app = express();

const Logger = require('../services/logger_services');

const logger = new Logger('app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'GMAIL',
  auth: {
    user: 'kingmonkey409@gmail.com',
    pass: 'Yos112233',
  },
});

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
    date: new Date(),
    id: utils.idGeneretor.generateId(),
  };

  logger.info('creating an order', order);

  if (body.userName === null || body.userName === '') {
    logger.error('username field is empty', order);
    return res.send('username field is empty');
  }
  if (body.product === null || body.product === '') {
    logger.error('product field is empty', order);
    return res.send('product field is empty');
  }
  orderModel.createOrder(order);
  logger.info('Orders were created', order);
  const strOrder = JSON.stringify(order);

  const mailOptions = {
    from: 'kingmonkey409@gmail.com',
    to: 'yosziad88@gmail.com',
    subject: 'A new order has been created',
    text: `order details: ${strOrder}`,
  };

  transporter.sendMail(mailOptions, (error2, info) => {
    if (error2) {
      logger.error(error2);
    } else {
      logger.info(`Email sent: ${info.response}`);
    }
  });

  return res.send('Orders were created');
};

const getOrder = (req, res) => {
  const id = Number(req.params.orderId);
  const order = orderModel.getOrder(id);
  logger.info(`order with ${id} id was fetched`, order);
  return res.status(200).json({
    message: 'Order details',
    order,
  });
};
const getOrdersByUsername = (req, res) => {
  const username = req.params.usersOrders;
  logger.info('fetching users orders');
  const usersOrders = orderModel.getOrdersByUsername(username);
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
