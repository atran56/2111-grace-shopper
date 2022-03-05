const router = require("express").Router();
const {
  models: { Reservation },
} = require("../db");

router.get("/:superheroId", async (req, res, next) => {
    try {
        const reservations = await Reservation.findOne({ where: { 
          superheroId: req.params.superheroId}});
        if (reservations) {
            res.json(reservations);
        }
        else {
            res.json()
        }
      } catch (err) {
        next(err)
      }
  });

module.exports = router;