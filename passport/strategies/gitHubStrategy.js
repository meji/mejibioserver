const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require("../../models/User");
module.exports = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.ABSOLUTEURI}/auth/github/callback`
  },
  async function(accessToken, refreshToken, profile, done) {
    try{
        const email = profile.emails[0].value
        const userByEmail = await User.findOne({email},function(err,obj) { obj })
        if(userByEmail){
          User.findOneAndUpdate({email}, {gitHubId: profile.id }, function (err, user) {return done(err, user);})
        }else{
          User.findOrCreate({ gitHubId: profile.id , status: "Active", name: profile.displayName, email: profile.emails[0].value }, function (err, user) {
            return done(err, user);
          })
        }
      }catch(error){
        console.log(error) 
      }
  }
);
    