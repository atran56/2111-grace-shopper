const router = require("express").Router();
const Superhero = require("../db/models/superhero");

router.get("/", async (req, res, next) => {
  try {
    const superheroes = await Superhero.findAll();
    res.json(superheroes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleSuperhero = await Superhero.findByPk(req.params.id);
    res.send(singleSuperhero);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const superhero = await Superhero.findByPk(req.params.id);
    res.send(await superhero.update(req.body));
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
