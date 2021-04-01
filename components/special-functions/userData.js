
function userData (user) {
    const userNoData = {
        username: "",
        password: "",
        displayName: "",
        givenName: "",
        familyName: "",
        googleId: "",
        email: "",
        profilePicture: "",
        posts: [],
    }





    if (user === undefined) { 
        return userNoData
    } else {
        return user
    }


}
module.exports = userData