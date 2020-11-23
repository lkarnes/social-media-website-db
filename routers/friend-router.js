const router = require('express').Router();
const friendDb = require('../models/friend-model');
const userDb = require('../models/user-model');

router.get('/all/:id', (req,res)=>{
    const id = req.params.id;
    friendDb.getAll(id).then(friends => {
        res.status(200).json(friends);
        }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req,res)=> {
    const id = req.params.id;
        userDb.get({id}).then(data => {
            delete data.password
            res.status(200).json(data)
        }).catch(err => res.status(500).json(err))
    })

router.get('/all/followers/:id', (req,res)=> {
    const id = req.params.id;
    friendDb.getAllFollowers(id).then(data => {
        res.status(200).json(data)
    })
})

router.post('/add', (req,res) => {
    const body = req.body;
    friendDb.add(body).then(data =>{
        res.status(201).json({message: 'friend added!'})
    }).catch(err => res.status(500).json(err))
})

router.get('/follow-count/:id', (req,res) => {
    const id = req.params.id;
    friendDb.getFollowCount(id).then(count => {
        res.status(200).json({count})
    })
})

router.get('follower-count/:id', (req,res) => {
    const id = req.params.id;
    friendDb.getFollowerCount(id).then(count => {
        res.status(200).json({count})
    })
})

router.delete('/remove/:userId/:friendId', (req,res) => {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    friendDb.remove(userId, friendId).then(message => {
        if(message === 1){
            res.status(204)
        }else {
            res.status(404).json({message: 'friend not found'});
        }
    }).catch(err => {res.status(500).json(err)})
})

router.put('/update', (req,res)=>{
    const body = req.body
    friendDb.update(body).then(data => {
        res.status(201).json({message: 'status has been updated'})
    }).catch(err => res.status(500).json(err))
})

router.get('/users/:characters', (req,res)=> {
    var chars = req.params.characters
    friendDb.getByLetters(chars).then(arr => {
        res.status(200).json(arr)
    }).catch(err =>{
        res.status(500).json({err})
    })
})

module.exports = router;