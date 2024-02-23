import { Schema, model } from "mongoose";

import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username is required"]
    },
    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    lastName: {
        type: String,
        required: [true, "ilast name s required"]
    },
    dob: Date,
    password: {
        type: String,
        required: [true, "password is required"]
    },
    email: {
        type: String,
        unique: true,
        reqired: [true, "email is required"]
    },
}, {timestamps: true})


userSchema.pre("save", async function(next){

    if(!this.isModified("password")) {
        return next()
    }

    try {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        next(error)
    }

})

userSchema.statics.findByEmailAndPassword = async function(username, password) {
      const user = await this.findOne({username})

    if(!user) {
        throw new Error("Unable to authenticate")
    }

    const isMatched = await bcrypt.compare(password, user.password)

    if(!isMatched) {
        throw new Error("Unable to authenticate")
    }

    return user
}

userSchema.methods.generateToken =  function() {
   
   return jwt.sign({id: this._id}, process.env.JWT_AUTH)
   
}

const User = model("User", userSchema)

export default User