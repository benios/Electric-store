const utils = require('../services/utils');

const ordersList = [];

const getAllOrders = () => (ordersList);

const getOrder = (id) => {
  if (ordersList.some((e) => e.id === id)) {
    return ordersList.find((order) => order.id === id);
  }
  return false;
};

const createOrder = (order) => {
  const id = utils.idGeneretor.generateId();
  order.id = id;
  ordersList.push(order);
};

const getOrdersByUsername = (username) => {
  if (ordersList.some((e) => e.id === username)) {
    const usersOrders = ordersList.filter((order) => order.userName === username);
    usersOrders.sort((a, b) => (b.date - a.date));
    return usersOrders;
  }
  return false;
};

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  getOrdersByUsername,
};
