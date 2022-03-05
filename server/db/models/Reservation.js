const Sequelize = require("sequelize");
const db = require("../db");

const Reservation = db.define("reservation", {
    bookedDates: {
        type: Sequelize.ARRAY(Sequelize.DATEONLY)
      }
})

module.exports = Reservation;