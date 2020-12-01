const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userDb = require('../models/user-model');
const parser = require('../image-storage/cloudinary');
const friendDb = require('../models/friend-model');

//cloudinary image conversion

router.post('/convert-image', parser.single("image"), (req,res) => {
    const body = {image: null}
    if (req.file) {
        body.image = req.file.url
        console.log(body)
        res.status(200).json(body)
    }else{
        res.status(500).json({error:'image not uploaded'})
    }

})

router.post('/login', (req,res)=>{
    console.log(req.body)
    const {username, password} = req.body;
    
    userDb.get({username}).then(user => {
        console.log('here')
        if(user && bcrypt.compareSync(password, user.password)){
            const token = userDb.genToken(user);
            res.status(200).json({token: token, userData: user})
        }else{
            res.status(404).json({message: 'username or password does not exist'})
        }
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.post('/register',parser.single("image"), (req,res)=> {
    const body = req.body;
    if(req.file){
        body.image=req.file.url
    }
    const hash = bcrypt.hashSync(body.password, 12);
    body.password = hash;
    const token = userDb.genToken(body);
    userDb.add(body).then(user => {
        friendDb.add({user_id: user, friend_id: 10, friendship_status: 'low'}).then(()=> {
            res.status(201).json({token: token, userData: {...body, id: user }})
        }).catch(err => res.status(500).json({error: {err}, message: 'toruble adding company account to friends'})) 
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.put('/edit/:id', parser.single("image"), (req,res) => {
    const body = req.body;
    if(req.file){
        body.image=req.file.url
    }
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

//gets username from token and returns the usersdata
router.get('/getData/:id', (req,res)=> {
    const id = req.params.id
    userDb.get({id}).then(response => {
        res.status(200).json(response)
    }).catch(err => {
        res.status(404).json({error: err, message: 'user not found'})
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