const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  firstname: {
    type: String,
    require: [true, { message: "firstname is required" }]
  },
  lastname: {
    type: String,
  },
  telnum: {
    type: String,
    require: [true, { message: "telnum is required" }],
  },
  email: {
    type: String,
    require: [true, { message: "email is required" }],
  },
  messagetext: {
    type: String,
    required: [true, { message: "Message is required" }],
  },
  subject: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;

