const Sequelize = require("sequelize");
const db = require("../db");

const ItemizedOrder = db.define("itemizedOrder", {
  days: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

module.exports = ItemizedOrder;
