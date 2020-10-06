const db = require('../data/dbConfig');
const friendDb = require('./friend-model');
const userDb = require('./user-model');
const knexfile = require('../knexfile');


const grabPosts = (friends, days) => {
    const dt = new Date()
    
    dt.setDate(dt.getDate() - days);
    return db('friends').join('posts', function(){
        this.on('friends.friend_id', '=', 'posts.poster_id').onIn('posts.poster_id', friends)
    }).where('created_at','>',dt)
}
const getFriendsPost = (friends)  => {
    return db('friends').join('posts', function(){
        this.on('friends.friend_id', '=', 'posts.poster_id').onIn('posts.poster_id', friends)
    })
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
    getFriendsPost,
    getPostById,
    add,
    edit,
    remove
}