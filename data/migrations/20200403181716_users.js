
exports.up = function(knex) {
  return knex.schema.createTable('users', user=>{
      user.increments();
      user.string('username',124).notNullable().unique();
      user.string('email', 124).notNullable().unique();
      user.string('password', 248).notNullable();
      user.string('first_name', 124).notNullable();
      user.string('last_name', 124).notNullable();
      user.string('image');
      user.string('created_at');
      user.string('updated_at');
  })
  .createTable('friends', friend=> {
      friend.integer('friend_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      friend.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      friend.string('friendship_status').notNullable();
  })
  .createTable('posts', post=> {
      post.increments();
      post.string('type').notNullable();
      post.string('header', 40);
      post.string('body', 400).notNullable();
      post.string('status').notNullable();
      post.string('created_at');
      post.integer('poster_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      post.string('image');
      post.string('color');
      post.string('background');
      post.integer('likes').defaultTo(0);
      post.integer('comments').defaultTo(0);
  })
  .createTable('comments', com=> {
      com.increments();
      com.string('body', 120);
      com.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE').onUpdate('CASCADE');
      com.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    })
  .createTable('likes', like=>{
      like.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE').onUpdate('CASCADE');
      like.integer('comment_id').unsigned().references('id').inTable('comments').onDelete('CASCADE').onUpdate('CASCADE');
      like.integer('liker_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      like.unique(['post_id', 'liker_id']);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('likes').dropTableIfExists('comments').dropTableIfExists('posts').dropTableIfExists('friends').dropTableIfExists('users')
};
