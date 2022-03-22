const Sequelize = require("sequelize");
const db = require("../db");

const Reservation = db.define("reservation", {
    startDate: {
        type: Sequelize.DATEONLY
    },
    endDate: {
        type: Sequelize.DATEONLY
    },
    superheroId: {
        type: Sequelize.INTEGER
    },
})
Reservation.getDates = function(startDate, endDate) {
    console.log(startDate, endDate)
    var start = new Date(startDate);
    var end = new Date(endDate);
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    let dates = [];
    let currentDate = start;
    while (currentDate <= end) {
        dates.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dates
}

module.exports = Reservation;