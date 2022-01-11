const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  checkOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Cart;
