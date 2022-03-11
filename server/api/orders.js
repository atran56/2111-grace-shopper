const router = require("express").Router();

const {
  models: { Order, ItemizedOrder },
} = require("../db");

module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    console.log("REQ.PARAMS: ", req.params)
    const order = await Order.findOne({
      include: {
        model: ItemizedOrder,
        as: "itemizedOrders",
      },
      where: { 
      userId: req.params.id,
    checkOut: false } });
    res.json(order);
  } catch (err) {
    next(err)
  }
})

// After new user creation and checkout: create new empty order
// router.post("/", async (req, res, next) => {
//   try {
//     const newOrder = await Order.create(req.body);
//     res.status(201).send(newOrder);
//   } catch (err) {
//     next(err);
//   }
// });

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