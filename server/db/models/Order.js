const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  totalDays: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  checkOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  totalCost: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Order;
