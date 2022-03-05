const Sequelize = require("sequelize");
const db = require("../db");

const Superhero = db.define("superhero", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  bio: {
    type: Sequelize.TEXT,
  },
  universe: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      "https://thumbs.dreamstime.com/b/green-hero-sky-generic-superhero-figure-flying-layered-easy-to-edit-see-portfolio-similar-images-36834436.jpg",
  },
  strengths: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Superhero;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
