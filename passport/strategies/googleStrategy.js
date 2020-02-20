const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("../../models/User");
require("dotenv").config();
module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.ABSOLUTEURI}/auth/google/callback`, 
    proxy: true
  },
  async function(accessToken, refreshToken, profile, done) {
    try{
      const email = profile.emails[0].value
      const userByEmail = await User.findOne({email},function(err,obj) { obj })
      if(userByEmail){
        User.findOneAndUpdate({email}, {googleId: profile.id}, function (err, user) {return done(err, user);})
      }else{
        User.findOrCreate({ googleId: profile.id , status: "Active", name: profile.displayName, email: profile.emails[0].value }, function (err, user) {
          return done(err, user);
        })
      }
    }catch(error){
      console.log(error) 
    }
  }
);

