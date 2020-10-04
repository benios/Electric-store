const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const orderModel = require('../model/order');

const app = express();

const Logger = require('../services/logger_services');

const logger = new Logger('app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ziadeyusef@gmail.com',
    pass: 'Yos112233',
  },
});

const idGeneretor = {
  lastId: 0,
  generateId() {
    this.lastId += 1;
    return this.lastId;
  },
};

const getAllOrders = (req, res) => {
  const ordersList = orderModel.getAllOrders();
  logger.info('Orders were fetched', ordersList);
  res.status(200).json({
    message: 'Orders were fetched',
    ordersList,
  });
};

const createOrder = (req, res) => {
  const { body } = req;
  const error = {};
  const order = {
    userName: body.userName,
    product: body.product,
    date: new Date(Date.now()).toLocaleString(),
    id: idGeneretor.generateId(),
  };

  logger.info('creating an order', order);

  if (body.userName === null || body.userName === '') {
    logger.error('username field is empty', order);
    error.username = 'username field is empty';
  }
  if (body.product === null || body.product === '') {
    logger.error('product field is empty', order);
    error.product = 'product field is empty';
  }
  if (Object.keys(error).length > 0) {
    logger.error('creating a new order failed', order);
    return res.send('creating a new order failed');
  }
  orderModel.createOrder(order);
  logger.info('Orders were created', order);

  const mailOptions = {
    from: 'ziadeyusef@gmail.com',
    to: 'yosziad88@gmail.com',
    subject: 'A new order has been created',
    text: `order details: ${order}`,
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
  res.status(200).json({
    message: 'Order details',
    order,
  });
};
const getOrdersByUsername = (req, res) => {
  const username = req.params.usersOrders;
  logger.info('fetching users orders');
  const usersOrders = orderModel.getOrdersByUsername(username);
  const sortedOrders = usersOrders.sort((a, b) => (Date.parse(b.date) - Date.parse(a.date)));
  logger.info(`orders of username:${username}has been fetched`, sortedOrders);
  res.status(200).json({
    message: `orders of username:${username}has been fetched`,
    sortedOrders,
  });
};

module.exports = {
  getOrder,
  createOrder,
  getAllOrders,
  getOrdersByUsername,
};
