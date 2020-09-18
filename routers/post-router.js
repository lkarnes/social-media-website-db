const router = require('express').Router();
const postDb = require('../models/post-model');
const friendDb = require('../models/friend-model');
const parser = require('../image-storage/cloudinary');

router.post('/createpost',parser.single("image"), (req,res) => {
    const body = req.body
    let date = new Date()
    date.setDate(date.getDate())
    body['created_at'] = date
    postDb.add(body).then(() =>{ 
        res.status(201).json({message: 'post has been added'})
    }).catch(err => {res.status(401).json({error:err})})
})


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
    postDb.grabPosts(id,100).then(response => {
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
        postArr = [...postArr, ...posts]
    }
        res.status(200).json(postArr)
})
//returns posts made by friends from the past set days
router.get('/recent/:id/:days', async(req, res)=> {
    const {id, days} = req.params;
    let data = []
    let friends = await friendDb.getAll(id)
    for(let i = 0; i < friends.length; i++){
        let posts = await postDb.grabPosts(friends[i].friend_id, days)
        data = [...data, ...posts]
    }
    data.length > 0 ? 
    res.status(200).json(data):
    res.status(404).json({'err': 'no data found'})
})


module.exports = router;