import { Schema, model } from "mongoose";

const exerciseSchema = new Schema({
    name: String,
    type: String,
    equipment: String,
    difficulty: String,
    instruction: String,
    muscle: String
})

const Exercise = model("Exercise", exerciseSchema)


const getEx = async muscle => {
    const res = await fetch(`https://api.api-ninjas.com/v1/exercises?type=strength&muscle=${muscle}`, {
        headers: {
            "X-Api-Key": "Lt/t/WXUUKl7c6bsvpiUVA==BwUIS4CTDQfCoRe1"
        }
    })
    const data = await res.json()
    console.log(data)
    for(let ex of data) {
        await Exercise.create(ex)
    }
}

// await getEx("triceps")
// await getEx("chest")
// await getEx("traps")
// await getEx("lats")
// await getEx("lower_back")
// await getEx("middle_back")

export default Exercise

