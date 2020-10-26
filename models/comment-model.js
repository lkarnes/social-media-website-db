const db = require('../data/dbConfig');

const getComments = (post_id) => {
    return db('comments').where('post_id', post_id)
}
const addComment = () => {

}

const removeComment = () => {

}

module.exports = {
    getComments,
}