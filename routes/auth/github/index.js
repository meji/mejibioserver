const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get('/',  passport.authenticate('github', { scope: [ 'user:email' ], session: false})); 
router.use("/callback", require("./callback"))

module.exports = router;

