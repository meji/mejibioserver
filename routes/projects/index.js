const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");


router.get("/", async (req,res)=>{
    try {
        const response = await Project.find(Project);
        return res.status(200).json({data: response})
    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un error"});
    }
});

router.use("/new", require('./new'))
router.use("/newimg", require('./newImages'))
router.use("/img", require('./img'))

module.exports = router;