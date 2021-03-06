const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter an exercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "Enter an exercise name"
        },
        duration: {
          type: Number,
          required: "Enter an exercise duration in minutes"
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  {
    //If you want the virtual field to be displayed on client side, then set {virtuals: true} for toObject and toJSON in schema options in this case its toJSON--read off mongoose website
    toJSON: {
      virtuals: true
    }
  }
);


//declaring a virtual attribute on workoutSchema
workoutSchema.virtual("totalDuration").get(function () {
  // using reduce() to just get one solid total number, 0 being the initial value
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});
//then we set..
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;