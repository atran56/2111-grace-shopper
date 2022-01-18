const Sequelize = require("sequelize");
const db = require("../db");

const ItemizedOrder = db.define("itemizedOrder", {});

module.exports = ItemizedOrder;
