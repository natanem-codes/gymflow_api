import { Router } from "express";
import Exercise from "../models/exercise.mjs"

const router = Router()

router.get("/", async(req, res) => {
    try {
        const exercises = await Exercise.find().sort("name")
        res.send(exercises)
    } catch (error) {
        console.log(error.message)
    }
})

export default router