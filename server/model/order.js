const ordersList = [];

const getAllOrders = () => (ordersList);

const getOrder = (id) => ordersList.find((order) => order.id === id);

const createOrder = (order) => ordersList.push(order);

const getOrdersByUsername = (username) => ordersList.filter((order) => order.userName === username);

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  getOrdersByUsername,
};
