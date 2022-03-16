const router = require("express").Router();
const {
  models: { Order },
} = require("../db");

// After checkout: update order status to TRUE
router.patch("/", async (req, res, next) => {
  try {
    const order = await Order.findOne({ where: { 
      userId: req.body.userId,
      checkOut: false } });
    await order.update({checkOut: req.body.checkOut})
    res.status(200).send(order);
  }
  catch (error) {
      next(error);
  }
})

module.exports = router;