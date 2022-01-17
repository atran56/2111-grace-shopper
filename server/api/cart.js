const router = require("express").Router();
const ItemizedOrder = require("../db/models/ItemizedOrder");

router.get("/", async (req, res, next) => {
  try {
    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
