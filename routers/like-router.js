const router = require('express').Router();
const likeDb = require('../models/like-model');
const { like } = require('../models/post-model');
const postDb = require('../models/post-model');

router.get('/like/:liker_id/:post_id', (req,res) => {
    const body = req.params
    likeDb.like(body).then(() =>{
        postDb.like(body.post_id).then(() => {
            res.status(202).json({message: 'post/comment has been liked!'})
        }).catch(err => {
            res.status(500).json({err})
        })
    }).catch(err => {
        res.status(500).json({err})
    })
})

router.delete('/unlike/post/:liker_id/:post_id', (req,res) => {
    const body = req.params
    likeDb.unlikePost(body.liker_id, body.post_id).then(() =>{
        postDb.unlike(body.post_id).then(() => {
            res.status(202).json({message: 'post has been unliked!'})    
        }).catch(err => {
            res.status(500).json({err})
        })
    }).catch(err => {
        res.status(500).json({err})
    })
    
})

router.get('/likes/posts/:id', (req,res) => {
    const id = req.params.id
    likeDb.getLikedPosts(id).then(likes => {
        res.status(200).json(likes)
    }).catch(err => res.status(500).json({message: 'trouble getting users likes', error:{err}}))
})

module.exports = router; 