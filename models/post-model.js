const db = require('../data/dbConfig');



const grabPosts = (friends, offset = 0) => {
    return db('friends').select("friendship_status", "id", "type", "header", "body", "status", "created_at", "poster_id", "image", "color", "background", "likes")
    .join('posts', function(){
        this.onIn('posts.poster_id', friends)
    }).orderBy('created_at').limit('15').offset(offset)
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

const like = (id) => {
    return db('posts').where({id}).increment('likes', 1)
}
const unlike = (id) => {
    return db('posts').where({id}).andWhere('likes', '>', '0').decrement('likes', 1)
}

module.exports = {
    grabPosts,
    getFriendsPost,
    getPostById,
    add,
    edit,
    remove, 
    like,
    unlike
}