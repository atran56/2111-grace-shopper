const ItemizedOrder = require("../db/models/ItemizedOrder");
const Order = require("../db/models/Order");

async function updateOrder(orderId) {
    const order = await Order.findByPk(orderId, {
      include: [{ model: ItemizedOrder, as: "itemizedOrders" }],
    });
    const newTotalDays = order.itemizedOrders.reduce(
      (acc, currVal) => acc + currVal.days,
      0
    );
    await order.update({ totalDays: newTotalDays });
  }
  
  async function orderBelongsToUser(user, orderId) {
    const correctOrder = await Order.findOne({ where: {userId: user.id, id: orderId}})
    if (correctOrder) {
      return true;
    }
    return false;
  }

  module.exports = {updateOrder, orderBelongsToUser}