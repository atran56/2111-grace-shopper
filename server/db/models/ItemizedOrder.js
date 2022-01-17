const Sequelize = require("sequelize");
const db = require("../db");

const ItemizedOrder = db.define("itemizedOrder", {
  days: {
    type: Sequelize.INTEGER,
  },
  //STARTDATE:
  //ENDDATE:
  subtotal: {
    type: Sequelize.INTEGER,
  },
});

module.exports = ItemizedOrder;
