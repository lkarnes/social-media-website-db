const router = require('express').Router();
const postDb = require('../models/post-model');
const friendDb = require('../models/friend-model');
const parser = require('../image-storage/cloudinary');
const { grabPosts } = require('../models/post-model');
//create posts
router.post('/createpost',parser.single("image"), (req,res) => {
    const body = req.body
    if(req.file){
        body.image=req.file.url
    }
    let date = new Date()
    date.setDate(date.getDate())
    body['created_at'] = date
    postDb.add(body).then(response =>{ 
        body['id'] = response[0]
        res.status(201).json(body)
    }).catch(err => {res.status(401).json(err)})
})

//get all friends posts
router.get('/all/:id', (req, res) => {
    const id = req.params.id;
    friendDb.getAll(id).then(friends => {
        friends.push({friend_id: id})
        postDb.getFriendsPost(friends).then(posts => {
                res.status(200).json(posts)
            }).catch(err => res.status(400).json({message: 'trouble getting friends posts', error: {err}}))
    }).catch(err =>{
        res.status(500).json({message: 'trouble getting friends', error: {err}})
    })
})

//get all post from user
router.get('/:id/:offset', (req,res)=> {
    const {id, offset} = req.params;
    postDb.grabUserPosts(id, offset).then(response => {
        res.status(200).json(response)
    }).catch(err => res.status(500).json(err))
})

//get single post from post id
router.get('/single/:id', (req,res)=>{
    const id = req.params.id;
    postDb.getPostById(id).then(response => {
        res.status(200).json(response)
    }).catch(err => res.status(500).json(err))
})
//get all post from friends with specific relationship
router.get('/status/:status/:id/:offset',(req,res)=> {
    const {status, id, offset} = req.params;
    friendDb.getAllByStatus(id, status).then(friends => {
        friends.push({friend_id: id})
    postDb.grabPosts(friends, offset).then(posts => {
        res.status(200).json(posts)
    }).catch(err => {
        res.status(400).json({message: 'trouble getting friends posts', err})
    })
    }).catch(err =>{
        res.status(500).json({message: 'trouble getting friends', err})
    })
})
//returns posts made by friends from the past set days
router.get('/recent/:id/:offset', (req, res)=> {
    const {id, offset} = req.params;
    friendDb.getAll(id).then(friends => {
        friends.push({friend_id: id})
        postDb.grabPosts(friends, offset).then(posts => {

            res.status(200).json(posts)
        }).catch(err => {
            res.status(400).json({message: 'trouble getting friends posts', error: {err}})
        })
    }).catch(err =>{
        res.status(500).json({message: 'trouble getting friends', error: {err}})
    })
})

router.delete('/remove/:id', (req,res)=> {
    postDb.remove(req.params.id).then(() => {
        res.status(204).json({message: 'post deleted'})
    }).catch(err => {res.status(404).json({message: 'trouble deleting post'})})
})

module.exports = router;