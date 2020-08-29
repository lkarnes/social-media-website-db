const router = require('express').Router();
const postDb = require('../models/post-model');
const friendDb = require('../models/friend-model');
const { response } = require('express');

router.get('/all/:id', (req, res) => {
    const id = req.params.id;
    let response = [];
    friendDb.getAll(id).then(friends => {
        friends.forEach(friend => {
            postDb.grabPosts(friend.friend_id).then(data => {
                data.map(item => {
                    response.push(item)
                }) 
            }).catch(err => res.status(500).json({err, message: 'error getting the posts'}))
        })
    }).catch(err => res.status(500).json({err, message: 'error getting the friends'}))
    setTimeout(function(){ res.status(200).json(response)}, 200)
})

router.get('/:id', (req,res)=> {
    const id = req.params.id;
    postDb.grabPosts(id).then(response => {
        res.status(200).json(response)
    }).catch(err => res.status(500).json(err))
})

router.get('/single/:id', (req,res)=>{
    const id = req.params.id;
    postDb.getPostById(id).then(response => {
        res.status(200).json(response)
    }).catch(err => res.status(500).json(err))
})

router.get('/all/:status/:id', async(req,res)=> {
    const {status, id} = req.params;
    let postArr = [];
    let friends = await friendDb.getAllByStatus(id, status)
    for(let i = 0; i < friends.length; i++){
        let posts = await postDb.grabPosts(friends[i].friend_id)
        let push = await posts.forEach(post => postArr.push(post))
    }
        res.status(200).json(postArr)
})

router.get('/all/limited/:limit/:id', (req, res)=> {
    const {limit, id} = req.params;
    var date = new Date()
    var response = []
    date.setDate(date.getDate()-1)
    let postArr = [];
    friendDb.getAll(id).then(friends => {
        friends = friends.map(friend=>{
            postDb.grabPosts(friend.friend_id).then(post => {
                friend.post = post
                console.log(friend)
            }).catch(err => res.send(err))
        })
        res.status(201).json(friends)
    }).catch(err => res.send(err))
})


module.exports = router;