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

const uniqueUser = async (req, res, next) => {
    // User.getByUsername(req.newUser.username)
    //     .then(result => {
    //         if (result) {
    //             res.json({
    //                 status: 404,
    //                 message: 'username taken'
                    
    //             })
    //         }
    //     })
    const { username } = req.body
    const notUniqueUser = await dbConfig('users').where({username}).first()
    if (!notUniqueUser) {
        next()
    }
    else {
        next({ status: 400, message: 'invalid credentials' })
    }
}

module.exports = {
    validateUser,
    uniqueUser
}