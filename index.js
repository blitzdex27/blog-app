const express = require("express");
const bodyParser = require("body-parser")


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

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


// Set the app to listen at port 3000
let port = process.env.PORT 
if (port == null || port == ""){
    port = 3000
}
app.listen(port, () => {
    console.log("Server has started at port " + port)
})