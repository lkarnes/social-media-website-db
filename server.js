const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./routers/user-router');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req,res)=> {
    res.status(200).json({status: 'server running and ready for business!'}).catch(err => {
        res.status(500).json(err)
    })
})
server.use('/api/', userRouter)

module.exports = server;