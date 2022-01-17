const Sequelize = require("sequelize");
const db = require("../db");
//formerly named ItemizedOrder
//merge table
const Order_SuperHero = db.define("Order_SuperHero", {
  superheroId: {
    type: Sequelize.INTEGER,
  },
  orderId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Order_SuperHero;
