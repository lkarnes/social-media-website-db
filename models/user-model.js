const db = require('../data/dbConfig.js')
const jwt = require('jsonwebtoken')


const genToken = (user) =>{
    const payload = {
        subject: user.id,
        username: user.username
    }
    const secret = process.env.SECRET || 'secret';
    const options = {
        expiresIn: '20d'
    }
    return jwt.sign(payload, secret, options)
}

const add = (user) => {
    return db('users').returning('id').insert(user);
}
const edit = (user, id)=> {
    return db('users').where({id}).update(user)
}
const get = (filter)=> {
    return db('users').where(filter).first()
  }
const remove = (id)=> {
    return db('users').where({id}).del()
}

module.exports = {
genToken,
add,
edit,
get,
remove
}
