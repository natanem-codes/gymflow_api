import { Schema, model } from "mongoose";

const workoutSchema = new Schema({
    session: {
        type: Schema.Types.ObjectId,
        ref: "WorkoutSession"
    },
    exercise: {
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    },
    weight: {
        type: Number,
        min: [0, "{VALUE} cannot be negative"],
        required: [true, "{PATH} is required"]
    },
    numberOfSets: {
        type: Number,
        min: [0, "{VALUE} cannot be negative"],
        required: [true, "{PATH} is required"]
    },
    repetations: {
        type: Number,
        min: [0, "{VALUE} cannot be negative"],
        required: [true, "{PATH} is required"]
    },
    rest: {
        type: Number,
        min: [0, "{VALUE} cannot be negative"],
        required: [true, "{PATH} is required"]
    },
    note: String,
}, {
    timestamps: true
})

const Workout = model("Workout", workoutSchema)

export default Workout
