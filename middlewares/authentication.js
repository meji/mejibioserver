const passport = require("passport");

module.exports = {
  isAuthenticated: (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
      console.log(
        `Autenticación de estrategia jwt. Información recibida en el midleware: error: ${error}, user: ${user}, info: ${info}`
      );

      if (error) return res.status(500).json({ message: "Hubo un error" });
      if (!user) return res.status(401).json({ message: "No autorizado" });
      req.user = user;
      if(user.role="Admin");
        next();
    })(req, res, next);
  }
};

