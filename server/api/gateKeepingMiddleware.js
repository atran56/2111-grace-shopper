const {
  models: { User },
} = require("../db");

//  Store all of our functions that will act as middleware between our request and our response sand we will use it as we see it

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    // maybe try next(req, res, next)
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.administrator) {
    return res.status(403).send("No Access!");
  } else {
    // if the user is Admin
    next();
  }
};
module.exports = { requireToken, isAdmin };
