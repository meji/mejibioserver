const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");
const nodemailer = require("nodemailer");
const emailTemplate = require("../../controllers/email/template-email");


router.post("/", async (req,res)=>{
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.USER_NODEMAILER,
            pass: process.env.PASSWORD_NODEMAILER
        }
    });
    const {firstname, lastname, telnum, email, messagetext, subject} = req.body;
    try {

        const messageSaved = new Message({firstname, lastname, telnum, email, messagetext, subject});
        await messageSaved.save();
    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un error"});
    }
    try{
        const response = await transporter.sendMail({
            from: process.env.USER_NODEMAILER,
            to: process.env.USER_NODEMAILER,
            subject,
            text: messagetext,
            html: emailTemplate({ firstname, lastname, telnum, email, messagetext, subject })
        });
        return res.status(200).json(response);
    }catch(error){

    }



});

module.exports = router;