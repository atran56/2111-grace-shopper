const router = require("express").Router();
const ItemizedOrder = require("../db/models/ItemizedOrder");
const Order = require("../db/models/Order");
const Superhero = require("../db/models/superhero");
const { requireToken } = require("./gateKeepingMiddleware");

//getting the current cart with list of cart items (itemizedOrders)
router.get("/", requireToken, async (req, res, next) => {
  const user = req.user
  try {
    const userOrder = await Order.findAll({
      //eager loading to include the itemizedOrders
      include: {
        model: ItemizedOrder,
        as: "itemizedOrders",
      },
      where: {
        //this needs to change once we can get the JWT token from authentication header
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
    //if(orderBelongsToUser(req.user, req.body.data.orderId)) {
      //finding the open cart that matches up to the userID (we will need to change this when we get the JWT token)
      const cart = await Order.findOne({ where: { userId: req.user.id, checkOut: false } });
      //finding the right superhero
      const hero = await Superhero.findByPk(req.body.data.superheroId);
      //creating the new ItemizedOrder instance (new cart item)
      const newCartItem = await ItemizedOrder.create({
        days: req.body.data.days,
        subtotal: req.body.data.days * hero.cost,
        orderId: cart.id,
        superheroId: hero.id,
      });
      //update total days on order
      await updateOrder(cart.id);
      res.status(200).send(newCartItem);
    }
    //else {
     // throw 'UNAUTHORIZED!'
    //}} 
    catch (error) {
    next(error);
  }
});

//deleting an item from the cart
router.delete("/", requireToken, async (req, res, next) => {
  try {
    //if(orderBelongsToUser(req.user, req.body.data.orderId)) {
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
    // else {
    //   throw 'UNAUTHORIZED!'
    // }}
    catch (error) {
    next(error);
  }
});

//update item (num of days booked) in cart
router.patch("/", requireToken, async (req, res, next) => {
  try {
    //if(orderBelongsToUser(req.user, req.body.data.orderId)) {
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
    // else {
    //   throw 'UNAUTHORIZED'
    // }}
    catch (error) {
    next(error);
  }
});

//helper function to update the cart totalDays
async function updateOrder(orderId) {
  const order = await Order.findByPk(orderId, {
    include: [{ model: ItemizedOrder, as: "itemizedOrders" }],
  });
  const newTotalDays = order.itemizedOrders.reduce(
    (acc, currVal) => acc + currVal.days,
    0
  );
  await order.update({ totalDays: newTotalDays });
}

// async function orderBelongsToUser(user, orderId) {
//   console.log(await Order.findAll())
//   const correctOrder = await Order.findOne({ where: {userId: user.id, id: orderId}})
//   if (correctOrder) {
//     return true;
//   }
//   return false;
// }
module.exports = router;
