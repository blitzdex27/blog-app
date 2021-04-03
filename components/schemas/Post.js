const mongoose = require("mongoose")



const postSchema = new mongoose.Schema({
    datePosted: String,
    timePosted: String,
    title: String,
    content: String,
    visibility: Boolean,
    postedByString: String,
    postedBy: String,
    specificDateTime: Number
})

new mongoose.model("Post", postSchema)
