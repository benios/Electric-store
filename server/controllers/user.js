/* eslint-disable no-underscore-dangle */
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../model/user');
const Logger = require('../services/logger_services');
const role = require('../helpers/role');

const app = express();

const logger = new Logger('app');

app.use(jwt({ secret: process.env.JWT_KEY || "my_secret", algorithms: ['HS256'] }));

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
    throw new Error('age is not a number');
  }
};

const logout = async (req, res) => {
  res.cookie('token', 'none', {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
  })
  res
      .status(200)
      .json({ success: true, message: 'User logged out successfully' })
};

const loginUser = async (req, res) => {
  const username = req.body.userName;
  const { password } = req.body;
  let foundUser;
  try {
    foundUser = await User.findOne({ userName: username }).exec();
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }

  if (!foundUser) {
    logger.error('Incorrect username or password');
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }
  let result;
  try {
    result = await bcrypt.compare(password, foundUser.password);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
  if (result === true) {
    const token = jsonwebtoken.sign({ username: foundUser.userName, userId: foundUser._id, role: foundUser.role }, process.env.JWT_KEY || "my_secret", { expiresIn: '1h' });
    logger.info('logged in successfully', foundUser);
    res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60});
    return res.status(200).json({
      message: 'User details',
      foundUser,
    });
  }
  logger.error('Incorrect username or password');
  return res.status(401).json({
    message: 'Incorrect username or password',
  });
};

const createUser = async (req, res) => {
  let isUserExist;
  const currUser = {
    _id: new mongoose.Types.ObjectId(),
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    age: req.body.age,
    role: role.User,
  };
  logger.info('handling create a user request', currUser);
  try {
    newUserValidation(currUser);
  } catch (err) {
    logger.error(err, currUser);
    return res.status(400).send(err.message);
  }
  try {
    isUserExist = await User.findOne({ userName: currUser.userName }).exec();
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
  if (isUserExist !== null) {
    logger.error('Username exists');
    return res.status(409).send('Username exists, please try a different username');
  }
  try {
    bcrypt.hash(req.body.password, +(process.env.SALT_ROUNDS), async (error, hash) => {
      const user = new User({ ...currUser, password: hash });
      try {
        await user.save();
      } catch (err) {
        logger.error(err);
        return res.status(500).json({
          message: err.message,
        });
      }

      const token = jsonwebtoken.sign({ username: currUser.userName, userId: currUser._id, role: currUser.role }, process.env.JWT_KEY || "my_secret", { expiresIn: '1h' });
      logger.info('user created successfully', user);
      res.cookie('token', token, { httpOnly: true });
      return res.status(200).json({
        message: 'user created successfully',
        user,
      });
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.userId;
  let result;
  try {
    result = await User.deleteOne({ _id: id }).exec();
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: err,
    });
  }
  if (!result) {
    logger.error('Failed to find and delete the user');
    return res.status(404).json({
      message: 'Failed to find and delete the user',
    });
  }
  logger.info(`A user with ${id} id was deleted`, result);
  return res.status(200).json({
    message: 'successfully deleted the user',
  });
};

module.exports = {
  deleteUser,
  createUser,
  loginUser,
  logout
};
