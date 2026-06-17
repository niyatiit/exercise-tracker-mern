const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  description: String,
  duration: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Exercise", exerciseSchema);