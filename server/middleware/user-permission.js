const Logger = require('../services/logger_services');

const logger = new Logger('app');

function userPermission(testedField, testingCriterion, req, res) {
  if (testedField !== testingCriterion) {
    return false;
  }
  logger.error('Permission granted');
  res.status(200).json({
    message: 'Permission granted',
  });
  return true;
}

module.exports = {
  userPermission,
};
