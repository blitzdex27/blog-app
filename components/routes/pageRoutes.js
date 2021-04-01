const mongoose = require("mongoose")

const User = mongoose.model("User")
const Post = mongoose.model("Post")


module.exports = (app) => {

app.route("/")
.get((req, res) => {
    res.render("home", {isAuthenticated: req.isAuthenticated()})
})

app.route("/user-blogs")
.get((req, res) => {
    res.render("userBlogs", {isAuthenticated: req.isAuthenticated()})
})

app.route("/about")
.get((req, res) => {
    res.render("about", {isAuthenticated: req.isAuthenticated()})
})


app.route("/blog")
.get((req, res) => {
    res.render("blog", {isAuthenticated: req.isAuthenticated()})
})




}