const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get('/',  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] , session: false}));
router.use("/callback", require("./callback"))

module.exports = router;




