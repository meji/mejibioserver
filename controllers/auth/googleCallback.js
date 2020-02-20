const passport = require("passport");
const generateToken = require("./generateToken")


module.exports = (req, res) => {
    passport.authenticate('google', { failureRedirect: '/', session: false }, (error, user) => {
      console.log(
        `Autenticación de estrategia google. Información recibida: error: ${error}, user: ${user}`
      );
      if (error) return res.status(500).json({ message: "Hubo un error" });
      const token = generateToken(user)
        return res.redirect('http://localhost:3000/admin?token='+token);
      // Ejecutamos la función pasandole los parametros req y res
    })(req, res);
};
