require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser")


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

// Connect to mongoDB
require("./components/services/mongoose")


// initializing schemas
require("./components/schemas/User")


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