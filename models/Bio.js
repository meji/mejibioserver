const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bioSchema = new Schema({
  position: {
    type: String,
    require: [true, { message: "position is required" }]
  },
  claim: {
    type: String,
    require: [true, { message: "claim is required" }]
  },
  biotext: {
    type: String,
    require: [true, { message: "school is required" }],
  }
});

const Biom = mongoose.model("Biom", bioSchema);

module.exports = Biom;
