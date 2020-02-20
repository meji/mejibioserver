const express = require("express");
const router = express.Router();
const New = require("../../models/Project");
const { isAuthenticated } = require("../../middlewares/authentication");
router.post("/", isAuthenticated, async (req,res)=>{
    try {
        const {name, charge, client, date, description, url} = req.body;
        const project= new New({name, charge, client, date, description, url});
        await project.save();
        return res.status(200).json({message: "Proyecto creado correctamente"})
    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un error"});
    }
});

module.exports = router;