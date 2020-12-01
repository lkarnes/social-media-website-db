const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const restricted = require('./middleware/restricted-middleware');

const userRouter = require('./routers/user-router');
const friendRouter = require('./routers/friend-router');
const postRouter = require('./routers/post-router');
const likeRouter = require('./routers/like-router');
const commentRouter = require('./routers/comment-router');

server.use(express.json());
server.use(helmet());
server.use(cors());
server.get('/', (req,res)=> {
    res.status(200).json({status: 'server running and ready for business!'}).catch(err => {
        res.status(500).json(err)
    })
})
server.use('/api/', userRouter)
server.use(restricted)
server.use('/api/friends/', friendRouter)
server.use('/api/posts/', postRouter)
server.use('/api/', likeRouter)
server.use('/api/comments', commentRouter)

module.exports = server;