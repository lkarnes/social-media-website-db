
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('friends').del()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([
        {user_id: 1, friend_id: 2, status: 'medium'},
        {user_id: 1, friend_id: 3, status: 'high'},
        {user_id: 1, friend_id: 4, status: 'low'},
        {user_id: 1, friend_id: 5, status: 'high'},
        {user_id: 2, friend_id: 1, status: 'high'},
        {user_id: 2, friend_id: 3, status: 'medium'},
        {user_id: 2, friend_id: 4, status: 'high'},
        {user_id: 2, friend_id: 1, status: 'high'},
        {user_id: 3, friend_id: 1, status: 'medium'},
        {user_id: 3, friend_id: 2, status: 'medium'},
        {user_id: 3, friend_id: 3, status: 'low'},
        {user_id: 5, friend_id: 2, status: 'medium'},
        {user_id: 4, friend_id: 3, status: 'low'},
        {user_id: 4, friend_id: 1, status: 'medium'},
        {user_id: 4, friend_id: 2, status: 'low'}
      ]);
    });
};
