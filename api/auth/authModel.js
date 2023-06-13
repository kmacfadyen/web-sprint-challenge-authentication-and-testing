const db = require('../../data/dbConfig')

async function getById(id) {
    return await db('users')
        .where('id', id)
        .first()
}

async function createUser(user) {
    const [ newUser1 ] = await db('users')
        .insert(user)
    const newUser2 = await getById(newUser1)
    return newUser2    
}

async function getByUsername(username) {
    const newUser = await db('users')
        .where('username', username)
        .first()
    return newUser    
}


module.exports = {
    getById,
    createUser,
    getByUsername,
}