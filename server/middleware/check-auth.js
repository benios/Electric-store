const jwt = require('jsonwebtoken');
const Logger = require('../services/logger_services');

const logger = new Logger('app');

function authRole(role) {
  return (req, res, next) => {
    if (req.userData.role === role || req.userData.role === 'Admin') {
      return next();
    }
    logger.error('Not allowed');
    return res.status(401).json({
      message: 'Not allowed',
    });
  };
}

function authUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    return next();
  } catch (err) {
    logger.error('Auth failed');
    return res.status(500).json({
      message: 'Auth failed',
    });
  }
}

function userPermissionByID(req, res, next) {
  const { userId } = req.userData;
  const id = req.params.userId;
  if (id !== userId) {
    logger.error('Permission denied');
    return res.status(400).json({
      message: 'Permission denied',
    });
  }
  logger.info('Permission granted');
  return next();
}

function userPermissionByUsername(req, res, next) {
  const username = req.params.user;
  const orderUser = req.userData.username;
  if (username !== orderUser) {
    logger.error('Permission denied');
    return res.status(400).json({
      message: 'Permission denied',
    });
  }
  logger.info('Permission granted');
  return next();
}

function userPermissionByOrderId(username, orderUser) {
  if (username !== orderUser) {
    return false;
  }
  logger.info('Permission granted');
  return true;
}

module.exports = {
  authRole,
  authUser,
  userPermissionByID,
  userPermissionByUsername,
  userPermissionByOrderId,
};
