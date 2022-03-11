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
            res.json({bookedDates: dates});
        }
        else {
            res.json()
        }
      } catch (error) {
        next(error)
      }
  });


router.post("/", async (req, res, next) => {
  try {
    const reservations = req.body.cartItems;
    console.log("API HERE", reservations)
    reservations.forEach(async reservation => {
      await Reservation.create({orderId: reservation.orderId, superheroId: reservation.superheroId, userId: req.body.userId, startDate: reservation.startDate, endDate: reservation.endDate})
    })
    res.status(200).send();
  }
  catch (error) {
    next(error)
  }
})

module.exports = router;