const User = require('./authModel')

function validateUser (req, res, next) {
    const { username, password } = req.body
    if (!username || ! password ||
        !username.trim() || !password.trim()) {
            return res.status(400).json({
                // status: 400,
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
                return res.status(400).json({
                    // status: 400,
                    message: 'username taken'
                })
            }
            next()
        })
    // const { username } = req.body
    // const notUniqueUser = dbConfig('users').where({username}).first()
    // if (!notUniqueUser) {
    //     next()
    // }
    // else {
    //     next({ status: 400, message: 'invalid credentials' })
    // }
}

module.exports = {
    validateUser,
    uniqueUser
}