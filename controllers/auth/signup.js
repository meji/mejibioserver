const bcrypt = require("bcrypt");
const User = require("../../models/User");
const uuid = require("uuid/v1");
module.exports = async (req, res) => {
  const { password, email, name } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) return res.status(409).json({ error: "El usuario ya existe" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error" });
  }

  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(password, salt);

    const user = new User({
      password: hashPass,
      email,
      name,
    });
    await user.save();
    res.json({ user, response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};
