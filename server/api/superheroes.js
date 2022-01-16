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

router.get("/:id/edit", async (req, res, next) => {
  try {
    const singleSuperhero = await Superhero.findByPk(req.params.id);
    res.send(singleSuperhero);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
