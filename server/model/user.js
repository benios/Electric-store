const utils = require('../utils/utils');

const usersList = [];

const createUser = (user) => {
  const id = utils.idGenerator.generateId();
  usersList.push({ ...user, id });
};
const getUser = (id) => {
  if (usersList.some((e) => e.id === id)) {
    return usersList.find((user) => user.id === id);
  }
  return false;
};

const deleteUser = (id) => {
  if (usersList.some((e) => e.id === id)) {
    const index = usersList.findIndex((element) => element.id === id);
    usersList.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  deleteUser,
  createUser,
  getUser,
};


