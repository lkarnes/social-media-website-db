
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: "lk404",
          email: "404notfound@gmail.com",
          password: "password",
          first_name: "Cryptic",	
          last_name: "Enemy"
        },
        {
          username: "waterboard12",
          email: "penguin0003@gmail.com",
          password: "password",
          first_name: "John",	
          last_name: "Applea"
        },
        {
          username: "AlliBaba",
          email: "wakeme@gmail.com",
          password: "password",
          first_name: "Allison",	
          last_name: "Whitesmoke"
        },
        {
          username: "Ben10",
          email: "letmebreathe@gmail.com",
          password: "password",
          first_name: "Ben",	
          last_name: "Melons"
      },
      {
        username: "Logger17",
        email: "uponthehill@gmail.com",
        password: "password",
        first_name: "Logan",	
        last_name: "Fraiser"
      }
      ]);
    });
};
