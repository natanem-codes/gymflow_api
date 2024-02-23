import { Router } from "express";
import User from "../models/user.mjs";

const router = Router()
router.post("/register", async(req, res) => {
    
    try {
        const user = await User.findOne({username: req.body.username, email: req.body.email})
        if(user) throw new Error("User already exists.")
        const newUser =  new User(req.body)
        await newUser.save()
        const {username, firstName, lastName, dob, email}= newUser
    
        res.status(201).send({
            username, firstName, lastName, dob, email,
            token: newUser.generateToken()
        })
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

router.post("/login", async (req, res) => {
    
    try {
        
        const user = await User.findByEmailAndPassword(req.body.username, req.body.password)

        const {username, firstName, lastName, email, dob} = user
        res.send({username, firstName, lastName, email, dob, token: await user.generateToken()})
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})
export default router