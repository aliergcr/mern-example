const mongoose,
  { Schema } = require("mongoose");

const exercisesSchema = new Schema(
  {
    userName: {
      type: "String",
      required: true,
    },
    description: { type: "String", required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Exercises = mongoose.model("Exercises", exercisesSchema);

module.exports = Exercises;
