const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    require: [true, { message: "name is required" }]
  },
  description: {
    type: String,
    require: [true, { message: "description is required" }]
  },
  school: {
    type: String,
    require: [true, { message: "school is required" }],
  },
  dateInit: {
    type: String,
  },
  dateEnd:{
      type: String,
  }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
