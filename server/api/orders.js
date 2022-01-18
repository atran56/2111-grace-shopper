const router = require("express").Router();
const {
  models: { Order, User, Superhero },
} = require("../db");
//MAY NEED TO BE MOVED OR ADD ADDITIONAL ROUTE TO BE UNDER
// USERS ROUTES TO BE SPECIFIC TO USER ONLY
router.post("/", async (req, res, next) => {
  try {
    console.log("In Route-->", req.body);
    //Need UserId and superhero name for DB missing enties
    const newOrder = await Order.create(req.body);
    res.status(201).send(newOrder);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
