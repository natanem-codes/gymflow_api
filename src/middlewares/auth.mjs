import jwt from "jsonwebtoken"
import User from "../models/user.mjs"
export const verify = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].replace("Bearer ", "")
        if(!token) throw new Error("no token provided") 
        const {id} = await jwt.verify(token, process.env.JWT_AUTH)
       
        if(!id) throw new Error("Invalid token")
        const user = await User.findById(id)
        if(!user) throw new Error("Invalid token")
        req.user = user
        next()
    } catch (error) {
        return next(error)
    }
}

