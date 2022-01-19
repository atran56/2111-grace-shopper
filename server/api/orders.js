const router = require("express").Router();

const {
  models: { Order },
} = require("../db");

module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    console.log("REQ.PARAMS: ", req.params)
    const order = await Order.findOne({ where: { 
      userId: req.params.id,
    checkOut: false } });
    res.json(order);
  } catch (err) {
    next(err)
  }
})

// After new user creation and checkout: create new empty order
router.post("/", async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).send(newOrder);
  } catch (err) {
    next(err);
  }
});

// After checkout: update order status to TRUE
router.put("/", async (req, res, next) => {
  try {
    console.log("**REQ.BODY FROM REDUX", req.body)
    const order = await Order.findOne({ where: { 
      userId: req.body.userId,
    checkOut: false } });
    console.log("ORDER HERE", order)
    await order.update(req.body)
    res.status(200).send(order);
  }
  catch (error) {
      next(error);
  }
})


module.exports = router;