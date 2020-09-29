
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      var date = new Date()
      date.setDate(date.getDate())
      return knex('users').insert([
        {
          username: "lk404",
          email: "404notfound@gmail.com",
          password: "password",
          first_name: "Cryptic",	
          last_name: "Enemy",
          created_at: date,
          image:'https://res.cloudinary.com/dp4hbalzr/image/upload/v1585969936/sample.jpg'
        },
        {
          username: "waterboard12",
          email: "penguin0003@gmail.com",
          password: "password",
          first_name: "John",	
          last_name: "Applea",
          created_at: date,
          image:'https://res.cloudinary.com/dp4hbalzr/image/upload/v1585969936/sample.jpg'
        },
        {
          username: "AlliBaba",
          email: "wakeme@gmail.com",
          password: "password",
          first_name: "Allison",	
          last_name: "Whitesmoke",
          created_at: date,
          image:'http://res.cloudinary.com/dp4hbalzr/image/upload/v1600833155/images/xxy4qw6adj1fhpefziyy.jpg'
        },
        {
          username: "Ben10",
          email: "letmebreathe@gmail.com",
          password: "password",
          first_name: "Ben",	
          last_name: "Melons",
          created_at: "2020-07-26T22:50:05.135Z",
          image:'http://res.cloudinary.com/dp4hbalzr/image/upload/v1600833155/images/xxy4qw6adj1fhpefziyy.jpg'
      },
      {
        username: "Logger17",
        email: "uponthehill@gmail.com",
        password: "password",
        first_name: "Logan",	
        last_name: "Fraiser",
        created_at: date,
        image:'https://res.cloudinary.com/dp4hbalzr/image/upload/v1585969936/sample.jpg'
      }
      ]);
    });
};
