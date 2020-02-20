const passport = require("passport");
const generateToken = require("./generateToken")


module.exports = (req, res) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    console.log(
      `Autenticación de estrategia local. Información recibida: error: ${error}, user: ${user}, info: ${info}`
    );
    if (error) res.status(500).json({ message: "Hubo un error" });
    if (info) res.status(400).json({ message: info });
    const token = generateToken(user)
    //Devolvemos el token al usuario
    res.status(200).json({ data: { token } });
    // Ejecutamos la función pasandole los parametros req y res
  })(req, res);
};
