//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Superhero = require('./models/superhero')
const Order = require('./models/Order')
const ItemizedOrder = require('./models/ItemizedOrder')

// Order.belongsTo(User)
// User.hasMany(Order)

// Superhero.belongsToMany(User, {through: Cart})
// User.belongsToMany(Superhero, {through: Cart})

// Cart.belongsTo(User)
// User.hasOne(Cart)
// Order.belongsToMany(Superhero, { through: "itemizedOrders" })

User.hasMany(Order)
Superhero.belongsToMany(Order, { through: "itemizedOrder" })
Order.belongsToMany(Superhero, { through: "itemizedOrder" })


module.exports = {
  db,
  models: {
    User,
    Superhero,
    Order,
    ItemizedOrder
  },
}
