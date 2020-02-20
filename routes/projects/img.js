const express = require("express");
const router = express.Router();
const path = require("path");


router.get("/:name", async (req,res)=>{
    try {
        const {name} = req.params
        pathImage = path.resolve(__dirname, `../../uploads/projects/${name}`);
        res.status(200).sendFile(pathImage);
    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un error"});
    }
});


module.exports = router;