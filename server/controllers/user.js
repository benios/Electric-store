const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const Logger = require('../services/logger_services');

const saltRounds = 10;

const app = express();

const logger = new Logger('app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const newUserValidation = (user, password) => {
  const userNameValidationRegEx = /^([a-z]|[0-9]|-|_)+$/;
  const isUserNameValid = userNameValidationRegEx.test(user.userName);
  if (!isUserNameValid) {
    throw new Error('username is invalid');
  }
  if (!password) {
    throw new Error('password field is empty');
  }
  if ((password).length < 8) {
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

const loginUser = (req, res) => {
  const username = req.body.userName;
  const { password } = req.body;

  User.findOne({ userName: username })
    .exec()
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({
          message: 'User id does not exist',
        });
      }
      bcrypt.compare(password, foundUser.password, (error, result) => {
        if (result === true) {
          logger.info('logged in successfully', foundUser);
          return res.status(200).json({
            message: 'User details',
            foundUser,
          });
        }
        return res.status(500).json({
          message: error,
        });
      });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({
        message: err,
      });
    });
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
    const user = new User({
      userName: req.body.userName,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      age: req.body.age,
    });
    logger.info('handling create a user request', user);

    try {
      newUserValidation(user, req.body.password);
    } catch (err) {
      logger.error(err, user);
      return res.status(400).send('Error: creating a new user failed');
    }
    user.save();
    logger.info('user created successfully', user);
    return res.send('user created successfully');
  });
};

const deleteUser = (req, res) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: 'Failed to find and delete the user',
        });
      }
      logger.info(`A user with ${id} id was deleted`, result);
      return res.status(200).json({
        message: 'successfully deleted the user',
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
  deleteUser,
  createUser,
  loginUser,
};
