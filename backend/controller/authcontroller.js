const User = require("../db/User");

const register = async (req, res) => {
  try {
    console.log(req.body);
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to register user" });
  }
};

module.exports = register;
