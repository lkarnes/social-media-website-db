const db = require('../data/dbConfig.js');
module.exports = {
    getAll,
    getById,
    getByName,
    add,
    remove,
    update
}

const getAll = (userId) => {
 return db('friends').where('user_id', userId);
}
const getById = (id) => {
    return db('friends').where('friend_id', id);
}
const getByName = (name) => {
    return db('users').where('name', name);
}
const add = (obj) => {
    return db('friends').insert(obj);
}
const remove = (user_id, friend_id) => {
    return db('friends').where({user_id: user_id, friend_id: friend_id}).del();
}
const update = (body) => {
    return db('friends').where({user_id: body.user_id, friend_id: body.friend_id}).update(body);
}