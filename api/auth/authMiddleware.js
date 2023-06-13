const User = require('./authModel')

function validateUser (req, res, next) {
    const { username, password } = req.body
    if (!username || ! password ||
        !username.trim() || !password.trim()) {
            return res.json({
                status: 404,
                message: 'username and password required'
            })
    }
    else {
        req.newUser = {
            username: username.trim(),
            password: password.trim()
        }
        next()
    }    
}

function uniqueUser (req, res, next) {
    User.getByUsername(req.newUser.username)
        .then(result => {
            if (result) {
                res.json({
                    status: 404,
                    message: 'username taken'
                })
            }
        })
}

module.exports = {
    validateUser,
    uniqueUser
}