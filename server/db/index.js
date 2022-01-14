//this is the access point for all things database related!

const db = require("./db");


const User = require('./models/User')
const Superhero = require('./models/superhero')
const Order = require('./models/Order')
const ItemizedOrder = require('./models/ItemizedOrder')

User.hasMany(Order)
Order.belongsTo(User)
Superhero.belongsToMany(Order, { through: ItemizedOrder })
Order.belongsToMany(Superhero, { through: ItemizedOrder })



module.exports = {
  db,
  models: {
    User,
    Superhero,
    Order,
    ItemizedOrder
  },
};
