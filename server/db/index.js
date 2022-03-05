//this is the access point for all things database related!

const db = require("./db");


const User = require('./models/User')
const Superhero = require('./models/superhero')
const Order = require('./models/Order')
const ItemizedOrder = require('./models/ItemizedOrder')
const Reservation = require('./models/Reservation')

User.hasMany(Order)
Order.belongsTo(User)
ItemizedOrder.belongsTo(Order)
Order.hasMany(ItemizedOrder)
Superhero.belongsToMany(Order, { through: ItemizedOrder })
Order.belongsToMany(Superhero, { through: ItemizedOrder })
Reservation.belongsTo(Order);
Order.hasMany(Reservation);
Reservation.belongsTo(User);
User.hasMany(Reservation);


module.exports = {
  db,
  models: {
    User,
    Superhero,
    Order,
    ItemizedOrder,
    Reservation
  },
};
