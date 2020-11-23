const db = require('../data/dbConfig.js');


const getAll = (userId) => {
    return db('friends').select('friend_id', 'friendship_status').where('user_id', userId);
}
const getAllByStatus = (user_id, friendship_status) => {
    return db('friends').select('friend_id', 'friendship_status').where({"friendship_status":friendship_status.toString(), "user_id":user_id});
}
const getAllFollowers = (userId) => {
    return db('friends').where('friend_id', userId)
}
const getById = (id) => {
    return db('friends').where('friend_id', id);
}
const getFollowCount = (id) => {
    return db('friends').where('user_id', id).length
}
const getFollowerCount = (id) => {
    return db('friends').where('friend_id', id).length
}

const getByLetters = (letters) => {
    var lastname = null
    var firstname = null
    letters = letters.toLowerCase();
    if(letters.includes(' ')){
        var firstname = letters.split(' ')[0];
        firstname = firstname.toLowerCase();
        var lastname = letters.split(' ')[1];
        lastname = lastname.toLowerCase();
        return db('users').select('id','username', 'image', 'first_name', 'last_name').whereRaw('lower(first_name) LIKE ?',`${firstname}%`).andWhereRaw('lower(last_name) LIKE ?',`${lastname}%`).limit(10)
    }else{
        return db('users').whereRaw('lower(first_name) LIKE ?',`${letters}%`).orWhereRaw('lower(username) LIKE ?',`${letters}` ).orWhereRaw('lower(last_name) LIKE ?',`${letters}%`).limit(10)
    }
    
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
module.exports = {
    getAll,
    getAllByStatus,
    getById,
    getAllFollowers,
    getFollowCount,
    getFollowerCount,
    getByLetters,
    add,
    remove,
    update
}