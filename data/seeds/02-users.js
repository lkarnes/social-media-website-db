
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: "testing1",
          email: "snowyhills122@gmail.com",
          password: "password",
          first_name: "Johnny",	
          last_name: "Appleseed"
      },
      {
        username: "testing3",
        email: "snowyhills1221@gmail.com",
        password: "password",
        first_name: "Johnny",	
        last_name: "Appleseed"
    },
    {
      username: "testing2",
      email: "snowyhills1222@gmail.com",
      password: "password",
      first_name: "Johnny",	
      last_name: "Appleseed"
  }
      ]);
    });
};
