const passport = require("passport");
const generateToken = require("./generateToken")

module.exports = (req, res) => {
    passport.authenticate('github', { failureRedirect: '/login' }, (error, user) => {
        console.log(
        `Autenticación de estrategia google. Información recibida: error: ${error}, user: ${user}`
        );
        if (error) return res.status(500).json({ message: "Hubo un error" });
        const token = generateToken(user)
        return res.status(200).json({ data: { token } });
    })(req, res);
};