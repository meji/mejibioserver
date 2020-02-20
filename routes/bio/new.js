const express = require("express");
const router = express.Router();
const NewBio = require("../../models/Bio");


router.post("/", async (req,res)=>{
    try {
        const {position, claim, biotext} = req.body;
        const bioModel = new NewBio({position, claim, biotext});
        await bioModel.save();
        return res.status(200).json({message: "Bio creada correctamente"})
    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un error"});
    }



});

module.exports = router;