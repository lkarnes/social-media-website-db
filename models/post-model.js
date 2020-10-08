const db = require('../data/dbConfig');



const grabPosts = (friends, offset = 0) => {
    return db('posts').whereIn('poster_id', friends).limit(15).offset(offset)
}
const grabUserPosts = (id, offset = 0) => {
    return db('posts').where('poster_id', id).limit(15).offset(offset)
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

const like = (id) => {
    return db('posts').where({id}).increment('likes', 1)
}
const unlike = (id) => {
    return db('posts').where({id}).decrement('likes', 1)
}

module.exports = {
    grabPosts,
    grabUserPosts,
    getPostById,
    add,
    edit,
    remove, 
    like,
    unlike
}