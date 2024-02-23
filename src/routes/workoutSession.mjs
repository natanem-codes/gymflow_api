import { Router } from "express";
import WorkoutSession from "../models/workoutSession.mjs";

const router = Router()

router.get("/", async (req, res) => {
    console.log("here...")
    const sessions = await WorkoutSession.find({user: req.user}).populate("user")
    res.send(sessions)
})

router.get("/:id", async (req, res) => {
   
    const {id} = req.params

    try {
        const foundSession = await WorkoutSession.findById(id).select("title")
        res.send(foundSession)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post("/", async (req, res) => {
    const {title, note} = req.body
    console.log(req.body)
    const newSession = new WorkoutSession({user: req.user, title, note})
    await newSession.save()
    res.send(newSession)
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const deletedSession = await WorkoutSession.findByIdAndDelete(id)
        if(!deletedSession) throw new Error("Workout session not found")
        res.send(deletedSession)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
} )

export default router