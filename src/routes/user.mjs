import { Router } from "express";

const router = Router()

router.get("/me", async (req, res) => {
    try {
        const {username, firstName, lastName} = req.user
        res.send({username, firstName, lastName})
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

export default router