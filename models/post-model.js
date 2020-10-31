const db = require('../data/dbConfig');

const grabPosts = (friends, offset = 0) => {
    var ids = friends.map(friend => {
        return friend['friend_id']
    })
    return db('posts').whereIn('poster_id', ids).limit(15).offset(offset).orderBy('created_at')
}
const grabUserPosts = (id, offset = 0) => {
    return db('posts').where('poster_id', id).limit(15).offset(offset).orderBy('created_at')
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

const addComment = (id) => {
    return db('posts').where({id}).increment('comments', 1)
}

const removeComment = (id) => {
    return db('posts').where({id}).decrement('comments', 1)
}

module.exports = {
    grabPosts,
    grabUserPosts,
    getPostById,
    add,
    edit,
    remove, 
    like,
    unlike,
    addComment,
    removeComment
}