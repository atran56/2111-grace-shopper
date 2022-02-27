const Sequelize = require("sequelize");
const db = require("../db");

const ItemizedOrder = db.define("itemizedOrder", {
    days: {
      type: Sequelize.INTEGER,
    },
    startDate: {
      type: Sequelize.DATEONLY,
    },
    endDate: {
      type: Sequelize.DATEONLY,
    },
    subtotal: {
      type: Sequelize.INTEGER,
    },
  });

module.exports = ItemizedOrder;
