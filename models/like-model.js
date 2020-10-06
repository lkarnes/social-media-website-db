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

module.exports = {
    like,
    unlikePost,
    unlikeComment
}