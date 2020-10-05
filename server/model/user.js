const utils = require('../services/utils');

const usersList = [];

const createUser = (user) => {
  const id = utils.idGeneretor.generateId();
  user.id = id;
  usersList.push(user);
};
const getUser = (id) => usersList.find((user) => user.id === id);

const deleteUser = (id) => {
  const index = usersList.findIndex((element) => element.id === id);
  usersList.splice(index, 1);
};

module.exports = {
  deleteUser,
  createUser,
  getUser,
};
