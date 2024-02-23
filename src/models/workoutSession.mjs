import { Schema, model } from "mongoose";

const sessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    note: String
}, {timestamps: true})

const WorkoutSession = model("WorkoutSession", sessionSchema)




export default WorkoutSession