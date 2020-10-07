const express = require('express');
const bodyParser = require('body-parser');
const userModel = require('../model/user');
const Logger = require('../services/logger_services');

const app = express();

const logger = new Logger('app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const newUserValidation = (user) => {
  const userNameValidationRegEx = /^([a-z]|[0-9]|-|_)+$/;
  const isUserNameValid = userNameValidationRegEx.test(user.userName);
  if (!isUserNameValid) {
    throw new Error('username is invalid');
  }
  if (!user.password) {
    throw new Error('password field is empty');
  }
  if ((user.password).length < 8) {
    throw new Error('password field should have 8 or more digits and characters');
  }
  if (!user.firstName) {
    throw new Error('firstname field is empty');
  }
  if (!user.lastName) {
    throw new Error('lastName field is empty');
  }
  if (!user.address) {
    throw new Error('address field is empty');
  }
  if ((typeof (user.age) !== 'number') || (user.age < 0)) {
    throw new Error('address field is empty');
  }
};

const getUser = (req, res) => {
  const id = Number(req.params.userId);
  const user = userModel.getUser(id);
  if (!user) {
    return res.status(404).json({
      message: 'user id does not exist',
    });
  }
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
  };

  logger.info('handling create a user request', user);

  try {
    newUserValidation(user);
  } catch (err) {
    logger.error(err, user);
    return res.status(400).send('Error: creating a new user failed');
  }

  userModel.createUser(user);
  logger.info('user created successfully', user);
  return res.send('user created successfully');
};

const deleteUser = (req, res) => {
  const id = Number(req.params.userId);
  const didUserDeleted = userModel.deleteUser(id);
  if (!didUserDeleted) {
    return res.status(404).json({
      message: 'User id does not exist, deleting the User failed',
    });
  }
  logger.info('User deleted!');
  return res.status(200).json({
    message: 'User deleted!',
  });
};

module.exports = {
  deleteUser,
  createUser,
  getUser,
};
