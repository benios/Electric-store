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

module.exports = {
  authRole,
  authUser,
};
