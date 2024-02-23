import {Router} from "express"

import Workout from "../models/workout.mjs"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const {session} = req.query
        const workouts = await Workout.find({session}).populate("exercise", "-_id name muscle").populate("session", "-_id title")
        res.send(workouts)

    } catch (error) {
        console.log(error)
        res.status(400).send({error: error.message})
    }
})
router.post("/", async (req, res) => {
    console.log(req.body)
    const newWorkout = new Workout({
        ...req.body, 
        numberOfSets: Number(req.body.numberOfSets), 
        repetations: Number(req.body.repetations), 
        rest: Number(req.body.rest)
    })
    await newWorkout.save()
    await newWorkout.populate("exercise")


    res.send(newWorkout)
})

export default router