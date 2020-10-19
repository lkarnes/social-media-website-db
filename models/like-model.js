const db = require('../data/dbConfig');

const like = (body) => {
    return db('likes').insert(body);
}
const unlikePost = (liker_id, post_id) => {
    return db('likes').where({liker_id, post_id}).del();
}
const unlikeComment = (liker_id, comment_id) => {
    return db('likes').where(liker_id, comment_id).del()
}

const getLikedPosts = (id) => {
    return db('likes').where('liker_id',id).join('posts','likes.post_id','=','posts.id').select('id','type','header','body','status','created_at','poster_id', 'image', 'color', 'background', 'likes')
}

module.exports = {
    like,
    unlikePost,
    unlikeComment,
    getLikedPosts
}