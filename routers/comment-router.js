const router = require('express').Router();
const comDb = require('../models/comment-model')

router.get('/:post_id', (req,res) => {
    const id = req.params.post_id
    comDb.getComments(id).then(comments => {
        res.status(200).json(comments)
    })
})

router.post('/add', (req,res) => {
    const body = req.body
    console.log('hello')
    comDb.addComment(body).then(response => {
        res.status(201).json(response)
    })
})

module.exports = router;