const userPermission = (testedField, testingCriterion) => {
  if (testedField !== testingCriterion) {
    throw new Error('Permission denied!');
  }
};

module.exports = {
  userPermission,
};
