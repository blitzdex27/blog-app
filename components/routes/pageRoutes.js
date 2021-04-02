const mongoose = require("mongoose")

const User = mongoose.model("User")
const Post = mongoose.model("Post")
const withPicture = require("../special-functions/withPicture")
const userData = require("../special-functions/userData")


module.exports = (app) => {

app.route("/")
.get((req, res) => {
    console.log(req.user)

    res.render("home", {isAuthenticated: req.isAuthenticated(), user: userData(req.user), withPic: withPicture(userData(req.user))})
})

app.route("/user-blogs")
.get((req, res) => {

    
    res.render("userBlogs", {isAuthenticated: req.isAuthenticated(), user: userData(req.user), withPic: withPicture(userData(req.user))})
})

app.route("/about")
.get((req, res) => {
    
    res.render("about", {isAuthenticated: req.isAuthenticated(), user: userData(req.user), withPic: withPicture(userData(req.user))})
})


app.route("/blog")
.get((req, res) => {
    
    res.render("blog", {isAuthenticated: req.isAuthenticated(), user: userData(req.user), withPic: withPicture(userData(req.user))})
})

app.route("/dashboard/:userID")
.get((req, res) => {
    res.render("userDashboard", {isAuthenticated: req.isAuthenticated(), user: userData(req.user), withPic: withPicture(userData(req.user))})
})

app.route("/dashboard/:userID/edit-display-name")
.post((req, res) => {
    res.render("userDashboard", {isAuthenticated: req.isAuthenticated(), user: userData(req.user), withPic: withPicture(userData(req.user))})
})


}