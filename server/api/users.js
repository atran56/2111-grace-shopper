const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  models: { User },
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        id: user.id,
        name: user.username,
        email: user.email,
        isAdmin: user.administator,
        toekn: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});

const generateToken = user => {
  return jwt.sign(
    {
      id: user.id,
      name: user.username,
      email: user.email,
      idAdmin: user.administrator,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
