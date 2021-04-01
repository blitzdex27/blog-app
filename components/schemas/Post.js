const mongoose = require("mongoose")



const postSchema = new mongoose.Schema({
    datePosted: String,
    title: String,
    content: String,
    visibility: Boolean,
    postedBy: String,
})

new mongoose.model("Post", postSchema)
