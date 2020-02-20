const express = require("express");
const router = express.Router();

router.use('/bio', require('./bio'));
router.use('/courses', require('./courses'));
router.use('/jobs', require('./jobs'));
router.use('/projects', require('./projects'));
router.use('/messages', require('./messages'));
router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'));

router.get("/", (req, res) => {
    res.redirect(process.env.PUBLICURI)
});

module.exports = router

