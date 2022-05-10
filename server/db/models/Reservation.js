const Sequelize = require("sequelize");
const db = require("../db");

const Reservation = db.define("reservation", {
    startDate: {
        type: Sequelize.DATE
    },
    endDate: {
        type: Sequelize.DATE
    },
    superheroId: {
        type: Sequelize.INTEGER
    },
})

//this .getDates method was created to return an array of all the dates between startDate and endDate
//we need this array in order to display each superhero's booked/disabled dates on their calendar
Reservation.getDates = function(startDate, endDate) {
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