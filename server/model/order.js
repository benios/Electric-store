const ordersList = [];

const getAllOrders = () => (ordersList);

const getOrder = (id) => ordersList.find(order => order.id === id);

const createOrder = (order) => {ordersList.push(order)};


module.exports = {
    getAllOrders,
    getOrder,
    createOrder
}