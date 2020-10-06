const db = require('../data/dbConfig.js');


const getAll = (userId) => {
    return db('friends').where('user_id', userId).select(db.raw('ARRAY_AGG(friend_id) as friends'));
}
const getAllByStatus = (id, status) => {
    return db('friends').where({user_id: id, status: status})
}
const getById = (id) => {
    return db('friends').where('friend_id', id);
}
const getByName = (name) => {
    return db('users').where('name', name);
}
const getByLetters = (letters) => {
    var lastname = null
    var firstname = null
    if(letters.includes(' ')){
        firstname = letters.split(' ')[0]
        lastname = letters.split(' ')[1] 
        return db('users').select('id','username', 'image', 'first_name', 'last_name').where('first_name',`${firstname}`).andWhere('last_name','like',`%${lastname}%`).limit(10)
    }else{
        return db('users').where('first_name','like',`%${letters}%`).orWhere('username', 'like', `%${letters}`).orWhere('last_name', 'like',`%${letters}%`).limit(10)
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
    getByName,
    getByLetters,
    add,
    remove,
    update
}