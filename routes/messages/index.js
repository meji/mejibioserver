const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");


router.get("/", async (req,res)=>{
    try {
        const response = await Message.find(Message);
        return res.status(200).json({data: response})
    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un error"});
    }
});
router.use("/new", require('./new'))

module.exports = router;