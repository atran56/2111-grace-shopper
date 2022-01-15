const router = require("express").Router();
const Superhero = require("../db/models/superhero");

router.get("/", async (req, res, next) => {
  try {
    console.log("FROM ROUTE all SUPERHEROES");
    const superheroes = await Superhero.findAll();
    res.json(superheroes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    console.log("HELLO, ROUTE FOR SINGLE SUPERHERO TEST!!!!");
    const superhero = await Superhero.findByPk(req.params.id);
    console.log("In Router for single ->", superhero);
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

module.exports = router;
