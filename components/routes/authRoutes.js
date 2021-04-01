const passport = require("passport")
const mongoose = require("mongoose")

const User = mongoose.model("User")

module.exports = (app) => {
    app.route("/auth/google")
        .get(passport.authenticate("google", {
            scope: ['profile', 'email']
        }))



    app.route("/auth/google/callback")
        .get(passport.authenticate("google", {failureRedirect: "/signin"}), (req, res) => {
            console.log("Successfully logged in.")
            res.redirect("/")
        })


    app.route("/signup")
        .get((req, res) => {
            res.render("signup", {info: ""})
        })

        .post((req, res) => {
            const username = req.body.username
            const password = req.body.password
            const givenName = req.body.signupGivenName
            const familyName = req.body.signupLastName
            const displayName = req.body.signupDisplayName
            const email = req.body.username
            console.log(givenName)
            console.log(req.body)

            console.log(username)
            if (email == "") {
                res.render("signup", {info: "Please enter an email."})
            }

            User.register(new User( {
                 username:username, 
                 givenName:givenName,
                 familyName: familyName,
                 displayName: displayName,
                 email: email
                
                 
                }), password, (err, account) => {
                if (err) {
                    res.render("signup", {info: "Sorry, the email is already used. Please use a different one."})
                } else {
                    passport.authenticate('local')(req, res, function() {
                        res.redirect("/")
                    })
                }

            })

        })

    app.route("/signin")
        .get((req, res) => {
            res.render("signin")
        })

        .post((req, res) => {
            const userCredentials = new User({
                username: req.body.username,
                password: req.body.password
            })

            console.log("Checking user credentials...")
            req.login(userCredentials, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Authenticating user...")
                    passport.authenticate('local')(req, res, () => {
                        console.log("User us authenticated")
                        res.redirect("/")
                    })
                }
            })
        })

    app.route("/logout")
        .get((req, res) => {
            req.logout()
            res.redirect("/")
        })
}