const utils = require('../utils/utils');

const usersList = [];

const createUser = (user) => {
  const id = utils.idGeneretor.generateId();
  usersList.push(...user, id);
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
