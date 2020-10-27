const utils = require('../utils/utils');

const ordersList = [];

const getAllOrders = () => (ordersList);

const getOrder = (id) => ordersList.find((order) => order.id === id);

const createOrder = (order) => {
  const id = utils.idGenerator.generateId();
  ordersList.push({ ...order, id });
};

const getOrdersByUsername = (username) => {
  const usersOrders = ordersList.filter((order) => order.userName === username);
  usersOrders.sort((a, b) => (b.date - a.date));
  return usersOrders;
};

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  getOrdersByUsername,
};
