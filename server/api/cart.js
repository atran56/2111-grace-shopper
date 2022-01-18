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
    const cartItemToDelete = await ItemizedOrder.findByPk(req.params.id); //finds the order item by the ID
    const cartWithDeletedItem = await Order.findByPk(cartItemToDelete.orderId); //finds the order that contains this item
    await cartWithDeletedItem.update({totalDays: cartWithDeletedItem.totalDays - cartItemToDelete.days}) //updates the totalDays in the order to subtract the item that we're going to delete
    await cartItemToDelete.destroy(); //deletes the item
    res.status(204).send();
  }
  catch (error) {
    next(error);
  }
})

//update item days, item subtotal, then update order total days
router.patch("/:id", async (req, res, next) => {
    try {
        const updatedCartItem = await ItemizedOrder.findByPk(req.params.id);
        await updatedCartItem.set(req.body);
        await updatedCartItem.save();
        res.status(200).send(updatedCartItem);
    }
    catch (error) {
        next(error);
    }
})
module.exports = router;

