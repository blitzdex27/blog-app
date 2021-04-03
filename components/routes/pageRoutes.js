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

    Post.find({visibility: true}, (err, foundPublicPosts) => {
        res.render("userBlogs", {
            isAuthenticated: req.isAuthenticated(), 
            user: userData(req.user), 
            withPic: withPicture(userData(req.user)),
            foundPublicPosts: foundPublicPosts,
        })
    })
    
})

app.route("/user-blogs/:postID")
.get((req, res) => {

    Post.findById(req.params.postID, (err, foundPost) => {
        res.render("blog", {
            isAuthenticated: req.isAuthenticated(), 
            user: userData(req.user), 
            withPic: withPicture(userData(req.user)),
            foundPost: foundPost

        })
    })
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
    if (req.isAuthenticated()) {
        if (req.params.userID === userData(req.user).id) {

            Post.find({postedBy: req.user.id}, (err, foundPosts) => {

                res.render("userDashboard", {
                    isAuthenticated: req.isAuthenticated(), 
                    user: userData(req.user), 
                    withPic: withPicture(userData(req.user)),
                    posts: foundPosts
                })

            })

        } else {
            res.redirect("/signin")
        }

    } else {
        res.redirect("/signin")
    }
    
})

.post((req, res) => {
    if (req.params.userID === userData(req.user).id){
        if (req.isAuthenticated()){
            const newPost = new Post({
                datePosted: new Date().toLocaleDateString(),
                timePosted: new Date().toLocaleTimeString,
                title: req.body.postTitle,
                content: req.body.postContent,
                visibility: req.body.isPublic == "on" ? true : false,
                postedByString:req.user.displayName,
                postedBy: req.user.id,
                specificDateTime: new Date().getTime()
            })

            newPost.save().then(post => {
                User.findById(req.user.id, (err, foundUser) => {
                    foundUser.posts.push(post.id)
                    foundUser.save().then(() => {
                        res.redirect("/dashboard/" + req.user.id)
                    })
                })
            })

        } else {
            res.redirect("/signin")
        }
    } else {
        res.redirect("/signin")
    }
})


app.route("/dashboard/:userID/edit-display-name")
.post((req, res) => {
    if (req.isAuthenticated) {
        if (req.params.userID === req.user.id) {
            User.findById(req.user.id, (err, foundUser) =>{
                foundUser.displayName = req.body.newDisplayName
                foundUser.save().then(()=>{
                    res.render("userDashboard", {isAuthenticated: req.isAuthenticated(), user: userData(req.user), withPic: withPicture(userData(req.user))})
                })
            })


        } else {
            res.redirect("/login")
        }
    } else {
        res.redirect("/login")
    }


    
})


}