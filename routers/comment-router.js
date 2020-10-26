const router = require('express').Router();
const comDb = require('../models/comment-model')

router.get('/:post_id', (req,res) => {
    const id = req.params.post_id
    comDb.getComments(id).then(comments => {
        res.status(200).json(comments)
    })
})



module.exports = router;