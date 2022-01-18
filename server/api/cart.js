const router = require("express").Router();
const { redirect } = require("express/lib/response");
const ItemizedOrder = require("../db/models/ItemizedOrder");
const Order = require("../db/models/Order");

//getting the current cart with list of cart items (itemizedOrders)
router.get("/", async (req, res, next) => {
  try {
    const userOrder = await Order.findAll({ 
        include: {
            model: ItemizedOrder, //eager loading to include the itemizedOrders 
            as: "itemizedOrders"
        },
        where: {
            userId: req.body.userId, //this needs to change once we can get the JWT token from authentication header
            checkOut: false
        }
    });  
    res.json(userOrder[0]); //findAll should return an array of one item (each use can only have one "checkedout:false" cart at a time)
  } catch (error) {
    next(error);
  }
});

//deleting an item from the cart
router.delete("/:id", async (req, res, next) => {
  try {
    const cartItemToDelete = await ItemizedOrder.findByPk(req.params.id); //finds the cart item by the ID
    const orderId = cartItemToDelete.orderId; 
    await cartItemToDelete.destroy(); //delete item 
    await updateOrder(orderId); //calling my helper function to update the cart totalDays
    res.status(204).send();
  }
  catch (error) {
    next(error);
  }
})

//update item (num of days booked) in cart
router.patch("/:id", async (req, res, next) => {
    try {
        const updatedCartItem = await ItemizedOrder.findByPk(req.params.id); //finds the cart item by the ID
        await updatedCartItem.update({ //updates the cart item days 
          days: req.body.days
        });
        await updateOrder(updatedCartItem.orderId); //calling my helper function to update the cart totalDays
        res.status(200).send(updatedCartItem);
    }
    catch (error) {
        next(error);
    }
})

//helper function to update the cart totalDays
async function updateOrder(orderId) {
  const order = await Order.findByPk(orderId, {
    include: [
      {model: ItemizedOrder, as: "itemizedOrders"}
    ]
  });
  const newTotalDays = order.itemizedOrders.reduce((acc, currVal) => acc + currVal.days);
  order.update({totalDays: newTotalDays});
}
module.exports = router;
