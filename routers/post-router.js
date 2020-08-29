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
<<<<<<< HEAD
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
=======
        postArr = [...postArr, ...posts]
    }
        res.status(200).json(postArr)
})
//returns posts made by friends from the past set days
router.get('/recent/:id/:days', async(req, res)=> {
    const {id, days} = req.params;
    let data = []
    let friends = await friendDb.getAll(id)
    for(i = 0; i < friends.length; i++){
        let posts = await postDb.grabPosts(friends[i].friend_id, days)
        data = [...data, ...posts]
    }
    data.length > 0 ? 
    res.status(200).json(data):
    res.status(404).json({'err': 'no data found'})
>>>>>>> 0158ac5f21d77d82de6b29dce32b34b1143a877a
})


module.exports = router;