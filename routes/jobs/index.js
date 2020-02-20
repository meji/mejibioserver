const express = require("express");
const router = express.Router();
const Job = require("../../models/Job");


router.get("/", async (req,res)=>{
    try {
        const response = await Job.find(Job);
        return res.status(200).json({data: response})
    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un error"});
    }
});
router.use("/new", require('./new'))



module.exports = router;