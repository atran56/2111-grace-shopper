const router = require("express").Router();
const ItemizedOrder = require("../db/models/ItemizedOrder");
const Order = require("../db/models/Order");
const Superhero = require("../db/models/superhero");
const { requireToken } = require("./gateKeepingMiddleware");
const { updateOrder, orderBelongsToUser } = require("./helper");

//getting the current cart with list of cart items (itemizedOrders)
router.get("/", requireToken, async (req, res, next) => {
  const user = req.user
  try {
    const userOrder = await Order.findOrCreate({
      //eager loading to include the itemizedOrders
      include: {
        model: ItemizedOrder,
        as: "itemizedOrders",
      },
      where: {
        userId: user.id,
        checkOut: false,
      },
    });
    //findAll should return an array of one item (each use can only have one "checkedout:false" cart at a time)
    res.json(userOrder[0]);
  } catch (error) {
    next(error);
  }
});

//add item to cart
router.post("/", requireToken, async (req, res, next) => {
  try {
      //finding the open cart that matches up to the userID 
      const cart = await Order.findOrCreate({ where: { userId: req.user.id, checkOut: false } });
      //finding the right superhero
      const hero = await Superhero.findByPk(req.body.data.superheroId);
      //creating the new ItemizedOrder instance (new cart item)
      const newCartItem = await ItemizedOrder.create({
        days: req.body.data.days,
        startDate: req.body.data.startDate,
        endDate: req.body.data.endDate,
        subtotal: req.body.data.days * hero.cost,
        orderId: cart[0].id,
        superheroId: hero.id,
      });
      //update total days on order
      await updateOrder(cart[0].id);
      res.status(200).send(newCartItem);
    }
    catch (error) {
    next(error);
  }
});

//deleting an item from the cart
router.delete("/", requireToken, async (req, res, next) => {
  try {
    if(orderBelongsToUser(req.user, req.body.orderId)) {
      //finds the cart item by the userId and superheroId
      const cartItemToDelete = await ItemizedOrder.findOne({
        where: { orderId: req.body.orderId, superheroId: req.body.superheroId },
      });
      const orderId = cartItemToDelete.orderId;
      //delete item
      await cartItemToDelete.destroy();
      //calling my helper function to update the cart totalDays
      await updateOrder(orderId);
      res.status(204).send();
    }
    else {
      throw 'UNAUTHORIZED!'
    }}
    catch (error) {
    next(error);
  }
});

//update item (num of days booked) in cart
router.patch("/", requireToken, async (req, res, next) => {
  try {
    if(orderBelongsToUser(req.user, req.body.data.orderId)) {
      //finds the cart item by the userId and superheroId
      const hero = await Superhero.findByPk(req.body.data.superheroId);
      const updatedCartItem = await ItemizedOrder.findOne({
        where: {
          orderId: req.body.data.orderId,
          superheroId: req.body.data.superheroId,
        },
      });
      //updates the cart item days
      await updatedCartItem.update({
        days: req.body.data.days,
        subtotal: req.body.data.days * hero.cost
      });
      //calling my helper function to update the cart totalDays
      await updateOrder(updatedCartItem.orderId);
      res.status(200).send(updatedCartItem);
    }
    else {
      throw 'UNAUTHORIZED'
    }}
    catch (error) {
    next(error);
  }
});

module.exports = router;
