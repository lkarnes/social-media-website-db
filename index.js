require('dotenv').config();

const server = require('./server.js')
const port = 6000 || process.env.PORT;

server.listen(port, ()=> {console.log(`!!!###Server Listening on ${port}###!!!`)})