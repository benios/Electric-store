const usersList = [];

const createUser = (user) => usersList.push(user);

const getUser = (id) => usersList.find((user) => user.id === id);

const deleteUser = (id) => {
  const user = (element) => element.id === id;
  const index = usersList.findIndex(user);
  usersList.splice(index, 1);
};

module.exports = {
  deleteUser,
  createUser,
  getUser,
};
