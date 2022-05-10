const Sequelize = require("sequelize");
const db = require("../db");

//Itemized order represents each item in an order/cart - it is a thru table between superhero and order
const ItemizedOrder = db.define("itemizedOrder", {
    days: {
      type: Sequelize.INTEGER,
    },
    startDate: {
      type: Sequelize.DATEONLY
  },
  endDate: {
    type: Sequelize.DATEONLY
},
    subtotal: {
      type: Sequelize.INTEGER,
    },
  });

module.exports = ItemizedOrder;
