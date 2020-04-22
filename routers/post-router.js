const router = require('express').Router();
const postDb = require('../models/post-model');
const friendDb = require('../models/friend-model');

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
        console.log(i)
        let posts = await postDb.grabPosts(friends[i].friend_id)
        let push = await posts.forEach(post => postArr.push(post))
            console.log(postArr)
    }
        res.status(200).json(postArr)
})

router.get('/all/:limit/:id', (req, res)=> {
    const {limit, id} = req.params;
    let count = 0;
    friendDb.getAll(id).then(friends => {
        friends.map(friend => {
            postDb.grabPosts(friend.friend_id).then(response => {

            })
        })
    })

})


module.exports = router;