const db = require('../data/dbConfig');

const getComments = (post_id) => {
    return db('comments').where('post_id', post_id).join('users', 'comments.user_id','=','users.id').select('comments.id','body','post_id', 'username', 'first_name', 'last_name', 'image')
}
const addComment = (comment) => {
    console.log(comment)
    return db('comments').insert(comment)
}

const removeComment = (id) => {
    return db('comments').where('id', id).del()
}

module.exports = {
    getComments,
    addComment,
    removeComment
}