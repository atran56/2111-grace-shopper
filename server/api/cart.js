const router = require("express").Router();
//const { redirect } = require("express/lib/response");
const ItemizedOrder = require("../db/models/ItemizedOrder");
const Order = require("../db/models/Order");
const Superhero = require("../db/models/superhero");

//getting the current cart with list of cart items (itemizedOrders)
router.get("/", async (req, res, next) => {
  try {
    const userOrder = await Order.findAll({ 
      //eager loading to include the itemizedOrders 
        include: {
            model: ItemizedOrder,
            as: "itemizedOrders"
        },
        where: {
          //this needs to change once we can get the JWT token from authentication header
            userId: 1,
            checkOut: false
        }
    });  
    //findAll should return an array of one item (each use can only have one "checkedout:false" cart at a time)
    res.json(userOrder[0]); 
  } catch (error) {
    next(error);
  }
});

//add item to cart
router.post("/", async (req, res, next) => {
  try {
    //finding the open cart that matches up to the userID (we will need to change this when we get the JWT token) 
    const cart = await Order.findOne({ where: {userId: 1, checkOut: false}}); 
    //finding the right superhero
    const hero = await Superhero.findByPk(req.body.data.superheroId);  
    //creating the new ItemizedOrder instance (new cart item)
    const newCartItem = await ItemizedOrder.create({
      days: req.body.data.days, subtotal: (req.body.data.days * hero.cost), orderId: cart.id, superheroId: hero.id
    });
    //update total days on order
    await updateOrder(cart.id)
    res.status(200).send(newCartItem)
  }
  catch (error) {
    next(error);
  }
})

//deleting an item from the cart
router.delete("/", async (req, res, next) => {
  try {
    //finds the cart item by the userId and superheroId
    console.log(req.body)
    const cartItemToDelete = await ItemizedOrder.findOne({ where: {orderId: req.body.orderId, superheroId: req.body.superheroId} }); 
    const orderId = cartItemToDelete.orderId; 
    //delete item 
    await cartItemToDelete.destroy();
    //calling my helper function to update the cart totalDays
    await updateOrder(orderId);
    res.status(204).send();
  }
  catch (error) {
    next(error);
  }
})

//update item (num of days booked) in cart
router.patch("/", async (req, res, next) => {
    try {
      //finds the cart item by the userId and superheroId
        const updatedCartItem = await ItemizedOrder.findOne({ where: {orderId: req.body.orderId, superheroId: req.body.superheroId} }); 
        //updates the cart item days 
        await updatedCartItem.update({
          days: req.body.days
        });
        //calling my helper function to update the cart totalDays
        await updateOrder(updatedCartItem.orderId);
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
  const newTotalDays = order.itemizedOrders.reduce((acc, currVal) => acc + currVal.days, 0);
  await order.update({totalDays: newTotalDays});
}
module.exports = router;
