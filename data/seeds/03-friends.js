
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('friends').del()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([
        {user_id: 1, friend_id: 2, friendship_status: 'medium'},
        {user_id: 1, friend_id: 3, friendship_status: 'high'},
        {user_id: 1, friend_id: 4, friendship_status: 'low'},
        {user_id: 1, friend_id: 5, friendship_status: 'high'},
        {user_id: 2, friend_id: 1, friendship_status: 'high'},
        {user_id: 2, friend_id: 3, friendship_status: 'medium'},
        {user_id: 2, friend_id: 4, friendship_status: 'high'},
        {user_id: 2, friend_id: 1, friendship_status: 'high'},
        {user_id: 3, friend_id: 1, friendship_status: 'medium'},
        {user_id: 3, friend_id: 2, friendship_status: 'medium'},
        {user_id: 3, friend_id: 3, friendship_status: 'low'},
        {user_id: 5, friend_id: 2, friendship_status: 'medium'},
        {user_id: 4, friend_id: 3, friendship_status: 'low'},
        {user_id: 4, friend_id: 1, friendship_status: 'medium'},
        {user_id: 4, friend_id: 2, friendship_status: 'low'}
      ]);
    });
};
