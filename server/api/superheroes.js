const router = require("express").Router();
const {
  models: { Superhero },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    console.log("FROM ROUTE all SUPERHEROES");
    const superheroes = await Superhero.findAll();
    res.send(superheroes);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newSuperhero = await Superhero.create(req.body);
    res.json(newSuperhero);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const superhero = await Superhero.findByPk(req.params.id);
    res.json(superhero);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedSuperhero = await Superhero.findByPk(req.params.id);
    res.send(await updatedSuperhero.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const superhero = await Superhero.findByPk(req.params.id);
    await superhero.destroy();
    res.send(superhero);
  } catch (error) {
    next(error);
  }
});

//create patch route to edit the datesbooked field once an order is complete
router.patch("/booking/:id", async (req, res, next) => {
  try {
    const bookedSuperhero = await Superhero.findByPk(req.params.id);
    const updatedSuperhero = await bookedSuperhero.update({bookedDates: bookedSuperhero.dataValues.bookedDates.push(req.body[1])});
    res.send(updatedSuperhero);
  }
  catch (error) {
    next(error)
  }
})
module.exports = router;
