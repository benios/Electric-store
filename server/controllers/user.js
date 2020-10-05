const express = require('express');
const bodyParser = require('body-parser');
const userModel = require('../model/user');
const utils = require('../utils/utils');

const app = express();

const Logger = require('../services/logger_services');

const logger = new Logger('app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const getUser = (req, res) => {
  const id = Number(req.params.userId);
  const user = userModel.getUser(id);
  logger.setLogData(user);
  logger.info('You passed a user ID');
  return res.status(200).json({
    message: 'You passed a user ID',
    user,
  });
};

const createUser = (req, res) => {
  const user = {
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    age: req.body.age,
    id: utils.idGeneretor.generateId(),
  };

  logger.info('handling create a user request', user);

  const userNameValidationRegEx = /^([a-z]|[0-9]|-|_)+$/;
  const isUserNameValid = userNameValidationRegEx.test(user.userName);
  if (!isUserNameValid) {
    logger.error('Either userName or password field is incorrect');
  }
  if (user.password < 8) {
    logger.error('Either userName or password field is incorrect');
    return res.send('Either userName or password field is incorrect');
  }
  if (user.firstName === null || user.firstName === '') {
    logger.error('firstName field is empty');
    return res.send('firstName field is empty');
  }
  if (user.lastName === null || user.lastName === '') {
    logger.error('lastName field is empty', user);
    return res.send('lastName field is empty');
  }
  if (user.address === null || user.address === '') {
    logger.error('address field is empty');
    return res.send('address field is empty');
  }

  if (Number.isNaN(user.age)) {
    logger.error('age field is not a number', user);
    return res.send('age field is not a number');
  }
  userModel.createUser(user);
  logger.info('user created successfully', user);
  return res.send('user created successfully');
};

const deleteUser = (req, res) => {
  const id = Number(req.params.userId);
  const deletedUser = userModel.deleteUser(id);
  logger.info('User deleted!', deletedUser);
  return res.status(200).json({
    message: 'User deleted!',
    deletedUser,
  });
};

module.exports = {
  deleteUser,
  createUser,
  getUser,
};
