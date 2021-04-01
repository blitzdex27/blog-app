require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser")
const passport = require("passport")
const cookieSession = require("cookie-session")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))


// Connect to mongoDB
require("./components/services/mongoose")

// initializing schemas
require("./components/schemas/User")
require("./components/schemas/Post")


// Passport strategies
require("./components/services/passport")

// Make express use the passport strategies
app.use(cookieSession({
    maxAge: 1*30*60*1000,
    keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())

// Auth Routes  
require("./components/routes/authRoutes")(app)


// Page Routes
require("./components/routes/pageRoutes")(app)


// Set the app to listen at port 3000
let port = process.env.PORT 
if (port == null || port == ""){
    port = 3000
}
app.listen(port, () => {
    console.log("Server has started at port " + port)
})