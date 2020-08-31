const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./routers/user-router');
const friendRouter = require('./routers/friend-router');
const postRouter = require('./routers/post-router');

server.use(express.json());
server.use(helmet());
server.use((req,res, next) =>{
    req.headers('Access-Control-Allow-Origin', "http://localhost:3000/")
    next();
})
server.get('/', (req,res)=> {
    res.status(200).json({status: 'server running and ready for business!'}).catch(err => {
        res.status(500).json(err)
    })
})
server.use('/api/', userRouter)
server.use('/api/friends/', friendRouter)
server.use('/api/posts/', postRouter)
module.exports = server;