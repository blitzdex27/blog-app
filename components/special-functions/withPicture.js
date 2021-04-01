
function withPicture (user) {

    if (user.profilePicture === undefined || user.profilePicture === "") {
        return false
    }
    return true
}
module.exports = withPicture