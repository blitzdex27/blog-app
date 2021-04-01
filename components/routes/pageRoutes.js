const mongoose = require("mongoose")

const User = mongoose.model("User")
const Post = mongoose.model("Post")


module.exports = (app) => {

app.route("/")
.get((req, res) => {
    res.render("home")
})

app.route("/user-blogs")
.get((req, res) => {
    res.render("userBlogs")
})

app.route("/about")
.get((req, res) => {
    res.render("about")
})


app.route("/blog")
.get((req, res) => {
    res.render("blog")
})



app.route("/signin")
.get((req, res) => {
    res.render("signin")
})

app.route("/signup")
.get((req, res) => {
    res.render("signup")
})

}