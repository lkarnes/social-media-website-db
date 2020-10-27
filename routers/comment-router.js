const router = require('express').Router();
const comDb = require('../models/comment-model')
const postDb = require('../models/post-model')
router.get('/:post_id', (req,res) => {
    const id = req.params.post_id
    comDb.getComments(id).then(comments => {
        res.status(200).json(comments)
    })
})

router.post('/add', (req,res) => {
    const body = req.body
    comDb.addComment(body).then(response => {
        postDb.addComment(body.post_id).then(response=> {
            res.status(201).json({message: 'comment added!'})
        }).catch(err => {
            res.status(500).json({message: 'trouble incrementing/decrementing comments on post table', error: {err}})
        })
    })
})

router.delete('/remove/:id/:post_id', (req,res)=> {
    const {id, post_id} = req.params;
    comDb.removeComment(id).then(response => {
        postDb.removeComment(post_id).then(response =>{
            res.status(200).json({messsage: 'comment deleted'})
        }).catch(err => res.status(500).json({message: 'trouble incrementing/decrementing comments on post table', error: {err}}))
    })
})

module.exports = router;