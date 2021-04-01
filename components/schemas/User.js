const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    displayName: String,
    givenName: String,
    familyName: String,
    googleId: String,
    email: String,
    profilePicture: String,
    posts: Array,
})

new mongoose.model("User", userSchema)