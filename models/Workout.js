const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  exercises: [
    {
      type: Array,
    },
  ],
  day:Date,
  totalDuration:{
      type: Number,
      default:0

  }
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
