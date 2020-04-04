const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userDb = require('../models/user-model');
const parser = require('../image-storage/cloudinary');

router.post('/register',parser.single("image"), (req,res)=> {
    const body = req.body;
    if(req.file){
        body.image=req.file.url
    }
    const hash = bcrypt.hashSync(body.password, 12);
    body.password = hash;
    const token = userDb.genToken(body);
    userDb.add(body).then(user => {
        res.status(201).json({token: token, userData: body})
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.post('/login', (req,res)=> {
    const {username, password} = req.body;
    userDb.get({username}).then(user => {
        console.log(password, user.password)
        if(user && bcrypt.compareSync(password, user.password)){
            const token = userDb.genToken(user);
            res.status(400).json({token: token, data: user})
        }else{
            res.status(404).json({message: 'username or password does not exist'})
        }
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.put('/edit/:id', (req,res) => {
    const body = req.body;
    const id = req.params.id;
    userDb.edit(body, id).then(user => {
        userDb.get({id}).then(response => {
            res.status(201).json({message: 'user info edited' , data: response})
        }).catch(err => {
            res.status(404).json({message: 'trouble retrieving user data'})
        })
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;
    userDb.remove(id).then(response => {
        if(response===1){
            res.status(201).json({message: `account with id ${id} deleted`})
        }else{
            res.status(404).json({message: 'user not found'})
        }
        
    }).catch(err => res.status(500).json(err))
})

module.exports = router;