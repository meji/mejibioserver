const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");


router.get("/", isAuthenticated, async (req,res)=>{
    try {
        console.log("Authenticado")
        return res.status(200).json({data: true})
    }catch (error) {
        console.log(error);
        res.status(500).json({messsage: "Hubo un error"});
    }
});

module.exports = router;
