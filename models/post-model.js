const db = require('../data/dbConfig');
const friendDb = require('./friend-model');
const userDb = require('./user-model');


const grabPosts = (id, days) => {
    const dt = new Date()
    dt.setDate(dt.getDate() - days);
    return db('posts')
    .where('poster_id', id)
    .where('created_at', '<' , `${dt}`)
    .where('status', 'public')
    .orderBy('created_at')
}

const getPostById = (id) => {
    return db('posts').where('id',id)
}
const add = (body) => {
    return db('posts').insert(body)
}

const edit = (id, body) => {
    return db('posts').where({id}).update(body)
}

const remove = (id) => {
    return db('posts').where({id}).del()
}

module.exports = {
    grabPosts,
    getPostById,
    add,
    edit,
    remove
}