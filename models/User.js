const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

const userSchema = new Schema({
    email: {
        type: String,
        require: [true, { message: "email is required" }]
    },
    password: {
        type: String,
        require: [true, { message: "password is required" }]
    },
    name: {
        type: String,
        require: [true, { message: "name is required" }]
    },
    googleId: {
        type: String
    },
    role:{
        type: String,
        enum: ["Normal", "Admin"],
        default: "Normal"
    }
});
userSchema.plugin(findOrCreate);
const User = mongoose.model("User", userSchema);
module.exports = User;