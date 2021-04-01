const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: String,
    age: Number
})

new mongoose.model("User", userSchema)