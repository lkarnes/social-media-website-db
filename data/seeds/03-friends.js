
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('friends').del()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([
        {user_id: '1', friend_id: '2', status: 'high'},
        {user_id: '2', friend_id: '1', status: 'medium'},
        {user_id: '3', friend_id: '1', status: 'low'},
      ]);
    });
};
