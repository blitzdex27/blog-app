const passport = require("passport")


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
}