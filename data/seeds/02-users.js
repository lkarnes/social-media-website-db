
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      date = new Date()
      date.setDate(date.getDate())
      return knex('users').insert([
        {
          username: "lk404",
          email: "404notfound@gmail.com",
          password: "password",
          first_name: "Cryptic",	
          last_name: "Enemy",
          created_at: date
        },
        {
          username: "waterboard12",
          email: "penguin0003@gmail.com",
          password: "password",
          first_name: "John",	
          last_name: "Applea",
          created_at: date
        },
        {
          username: "AlliBaba",
          email: "wakeme@gmail.com",
          password: "password",
          first_name: "Allison",	
          last_name: "Whitesmoke",
          created_at: date
        },
        {
          username: "Ben10",
          email: "letmebreathe@gmail.com",
          password: "password",
          first_name: "Ben",	
          last_name: "Melons",
          created_at: "2020-07-26T22:50:05.135Z",
          created_at: date
      },
      {
        username: "Logger17",
        email: "uponthehill@gmail.com",
        password: "password",
        first_name: "Logan",	
        last_name: "Fraiser",
        created_at: date
      }
      ]);
    });
};
