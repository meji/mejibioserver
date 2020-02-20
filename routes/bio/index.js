const express = require("express");
const router = express.Router();
const Bio = require("../../models/Bio");
const path = require("path");

router.get("/", async (req,res)=>{
    try {
        const response = await Bio.find(Bio);
        pathImage = path.resolve(__dirname, `../../uploads/projects/${response.img}`);
        pathLogo = path.resolve(__dirname, `../../uploads/projects/${response.logo}`);
        response.img = pathImage
        response.logo = pathLogo
        return res.status(200).json({data: response})
    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un error"});
    }
});

router.use("/new", require('./new'))


module.exports = router;