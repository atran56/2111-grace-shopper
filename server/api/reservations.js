const router = require("express").Router();
const {
  models: { Reservation },
} = require("../db");

router.get("/:superheroId", async (req, res, next) => {
    try {
        const reservations = await Reservation.findAll({ where: { 
          superheroId: req.params.superheroId}});
          let dates = []
          reservations.forEach(reservation => {
            dates.push(Reservation.getDates(reservation.startDate, reservation.endDate))
          })
          dates = dates.join().split(",");
        if (dates.length >= 1) {
            res.json(dates);
        }
        else {
            res.json()
        }
      } catch (error) {
        next(error)
      }
  });


// router.post("/", async (req, res, next) => {
//   try {
//     const bookedDates = {type: 'bookedDates', dates: req.body.bookedDates}
//     await Reservation.create({superheroId: req.body.superheroId, userId: req.body.userId, bookedDates: bookedDates});
//     res.status(200).send();
//   }
//   catch (error) {
//     next(error)
//   }
// })

module.exports = router;