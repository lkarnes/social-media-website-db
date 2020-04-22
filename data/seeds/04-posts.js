
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {type: 'text', header: 'Story Header', body: 'This whole thing is crazy blah blah blah', status: 'public', poster_id: 1, color: 'grey', background: 'whitesmoke'},
        {type: 'text', header: 'tester', body: 'Do you remember what color that red truck parked on the hill was? its totally slipped my mind! thats totally crazy!', status: 'public', poster_id: 2, color: 'blue', background: 'red'},
        {type: 'text', header: 'hello friends,', body: '"this is a quote to test how quotes work"-logan in t he BE', status: 'public', poster_id: 5, color: 'green', background: 'lightgrey'},
        {type: 'text', header: 'console.log("oh my")', body: 'Are we even real? its har to tell anymore', status: 'public', poster_id: 5, color: 'pink', background: 'white'},
        {type: 'text', header: 'hello friends,', body: 'funny.', status: 'private', poster_id: 5, color: '', background: ''},
        {type: 'text', header: 'getting ahead of my self', body: 'Like if you even care', status: 'public', poster_id: 4, color: 'blue', background: 'red'},
        {type: 'text', header: 'like and comment your thoughts', body: 'Do you remember what color that red truck parked on the hill was? its totally slipped my mind! thats totally crazy!', status: 'public', poster_id: 3, color: 'red', background: 'lightblue'},
        {type: 'text', header: 'my weekend', body: 'Like if you even care', status: 'public', poster_id: 2, color: 'orange', background: 'brown'},
        {type: 'text', header: 'tester', body: 'Went to the movies yesterday', status: 'public', poster_id: 1, color: '', background: ''},
        {type: 'text', header: 'getting ahead of my self', body: 'meow', status: 'private', poster_id: 2, color: '', background: ''},
        {type: 'text', header: 'getting ahead of my self', body: 'Like if you even care', status: 'public', poster_id: 1, color: '', background: ''},
        {type: 'text', header: 'console.log("oh my")', body: 'something stinks', status: 'public', poster_id: 3, color: '', background: ''},
        {type: 'text', header: 'like and comment your thoughts', body: 'Do you remember what color that red truck parked on the hill was? its totally slipped my mind! thats totally crazy!', status: 'public', poster_id: 1, color: '', background: ''},
        {type: 'text', header: 'my weekend', body: '...okey', status: 'private', poster_id: 1, color: '', background: ''},
        {type: 'text', header: 'tester', body: 'Like if you even care', status: 'private', poster_id: 4, color: '', background: ''},
        {type: 'text', header: 'getting ahead of my self', body: 'Went to the movies yesterday', status: 'public', poster_id: 4, color: '', background: ''},
        {type: 'text', header: 'hello friends,', body: 'Do you remember what color that red truck parked on the hill was? its totally slipped my mind! thats totally crazy!', status: 'private', poster_id: 3, color: '', background: ''},
        {type: 'text', header: 'console.log("oh my")', body: 'oWo', status: 'public', poster_id: 3, color: '', background: ''},
        {type: 'text', header: 'like and comment your thoughts', body: 'moo', status: 'public', poster_id: 2, color: '', background: ''},
        {type: 'text', header: 'tester', body: 'Went to the movies yesterday', status: 'private', poster_id: 2, color: '', background: ''},
      ]);
    });
};
