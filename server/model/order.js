const ordersList = [];

const getAllOrders = () => (ordersList);

const getOrder = (id) => ordersList.find((order) => order.id === id);

const createOrder = (order) => ordersList.push(order);

const getOrdersByUsername = (username) => {
  const usersOrders = ordersList.filter((order) => order.userName === username);
  const sortedOrders = usersOrders.sort((a, b) => (Date.parse(b.date) - Date.parse(a.date)));
  return sortedOrders;
};

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  getOrdersByUsername,
};
