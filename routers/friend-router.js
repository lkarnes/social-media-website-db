const router = require('express').Router;
const bcrypt = require('bcryptjs')
const friendDb = require('../models/friend-model')
const userDb = require('../models/user-model');


router.get('/all/:id', (req,res)=>{
    const id = req.params.id;
    friendDb.getAll(id).then(friends => {
        friends.map(friend => {
            userDb.get(friend.id).then(data => {
                res.status(200).json(data)
            }).catch(err =>{
                res.status(500).json({message: 'trouble finding friends info'})
            })
        })
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req,res)=> {
    const id = req.params.id;
    friendsDb.getById(id).then(friend => {
        userDb.get(friend.id).then(data => {
            res.status(200).json(data)
        }).catch(err =>{
            res.status(500).json({message: 'trouble finding friend info'})
        })
    }).catch(err => res.status(500).json(err))
})

router.push('/add', (req,res) => {
    const body = req.body;
    friendsDb.add(body).then(data =>{
        res.status(201).json({message: 'friend added!', data: data})
    }).catch(err => res.status(500).json(err))
})

router.delete('/remove/:userId/:friendsId', (req,res) => {
    const userId = req.params.id;
    const friendsId = req.params.friends_id;
    friendsDb.remove(userId, friendsId).then(message => {
        if(message === 1){
            res.status(204).json({message: 'friend removed!'})
        }else {
            res.status(404).json({message: 'friend not found'});
        }
    }).catch(err => {res.status(500).json(err)})
})

router.update('/update', (req,res)=>{
    const body = req.body
    friendsDb.update(body).then(data => {
        res.status(201).json({message: 'status has been updated'})
    }).catch(err => res.status(500).json(err))
})