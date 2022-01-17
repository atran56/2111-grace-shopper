const router = require("express").Router();
const { redirect } = require("express/lib/response");
const ItemizedOrder = require("../db/models/ItemizedOrder");
const Order = require("../db/models/Order");

router.get("/", async (req, res, next) => {
  try {
    const userOrder = await Order.findAll({
        include: {
            model: ItemizedOrder,
            as: "itemizedOrders"
        },
        where: {
            userId: req.body.userId, //this needs to change once we can get the JWT token from authentication header
            checkOut: false
        }
    });  
    res.json(userOrder[0]);
  } catch (error) {
    next(error);
  }
});

// router.put("/:id", async (req, res, next) => {
//     try {

//     }
//     catch (error) {
//         next(error);
//     }
// })
module.exports = router;

