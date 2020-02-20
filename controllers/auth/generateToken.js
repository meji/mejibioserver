const jwt = require("jsonwebtoken");
module.exports =   function(user){
    const payload = {
    sub: user._id,
    exp: Date.now() + parseInt(process.env.JWT_EXPIRES),
    };

    // Generamos el token:
    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
    //Devolvemos el token al usuario
    return token
}