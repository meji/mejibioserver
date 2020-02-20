const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../../models/User");

const opts = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = new JwtStrategy(opts, async (tokenPayload, next) => {
  try {
    const user = await User.findOne({ _id: tokenPayload.sub });
    if (!user) next(null, false, { message: "invalid token" });
    next(null, user);
  } catch (error) {
    next(error);
  }
});
