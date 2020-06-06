const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name of Athlete?",
  },
  type: {
    type: String,
    required: "What type of workout are you doing?",
  },
  weight: {
    type: Number,
    required: "How much weight do you want to workout with?",
  },
  sets: {
    type: Number,
    required: "How many Sets are you doing?",
  },
  reps: {
    type: Number,
    required: "How many Reps are you doing?",
  },
  distance: {
    type: Number,
    required: "How far are you running?",
  },
  duration: {
    type: Number,
    required: "How long did you workout?",
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
