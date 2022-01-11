//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Superhero = require('./models/superhero')
const Cart = require('./models/cart')

Cart.belongsTo(User)
User.hasOne(Cart)
Cart.belongsToMany(Superhero, { through: "cart_superhero" })
Superhero.belongsToMany(Cart, { through: "cart_superhero" })

module.exports = {
  db,
  models: {
    User,
    Superhero,
    Cart
  },
}
