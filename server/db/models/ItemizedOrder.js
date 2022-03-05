const Sequelize = require("sequelize");
const db = require("../db");

const ItemizedOrder = db.define("itemizedOrder", {
    days: {
      type: Sequelize.INTEGER,
    },
    bookedDates: {
      type: Sequelize.ARRAY(Sequelize.DATEONLY)
    },
    subtotal: {
      type: Sequelize.INTEGER,
    },
  });

module.exports = ItemizedOrder;
