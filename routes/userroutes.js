const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const auth = require('../middleware/auth')

const router = express.Router()


router.post('/register'), async (req, res) => {
    const name = req.body.username , password = req.body.password 
    try{
        // check if user exist 
        const existingUser = await User.findOne({
            name:name,
            
        })
        if (existingUser){
            res.status(404).send({message: 'User already exist' || err.message, success: false})
        } 
        const encryptedPassword = await bcrypt.hash(password, 8)

        const user = new User({
            name:name,
            password: encryptedPassword,
            role: 'guest'
        })
        await user.save()
        const token = jwt.sign({
            userId: user._id}, process.env.SECRET_JWT)
        res.status(200).send({message: 'User registered in successfully',token, user, success: true })
    }catch(error){
    console.log(error)
}
}

router.post('login'), async (req, res) =>{
    try{
        const username = req.body.username, password = req.body.password
        const user = await User.findOne({
            name: username
        })
        if (!user){
            res.status(404).send({message: 'Please register your details before logging in' || err.message, success: false})
            
        }
        const passwordMatch = await bcrypt.compare(user.password, password)
        if (!passwordMatch){
            res.status(404).send({message: 'Invalid password' || err.message, success: false})

        }

        const token = jwt.sign({userId: user._id}, process.env.SECRET_JWT)
        res.status(200).send({message: 'User logged in successfully',token, user, success: true })

    }catch(error){
        console.log(error)
    }
}

router.get('/users', auth, async(req, res) =>{
    try{
        const users = await User.find({})
        res.status(200).send({message: 'Users found successfully', users})
    }catch(error){
        console.log(error)
    }
        
})
router.patch('/users/:id', auth, async(req, res)=>{
    try{
        const modifications = Object.keys(req.body)
        const allowModification = ['username', 'password', 'role']
        const isValid = modifications.every((modification => allowModification.includes(modification)))
        
        if (!isValid){
        res.status(404).send({message: 'Invalid modifications' || err.message, success: false})

        modifications.forEach(modification => req.user[modification]= req.body[modification])
        await req.user.save()
        res.status(200).send({message: 'Modified modifications', success:true})
    }
    }catch(error){
        console.log(error)
    }
    
})  

router.delete('/users/:id', auth, async(req,res) =>{
    try{
        const user = await User.findById(req.user._id)
        if (!user){
            res.status(404).send({message: 'Invalid user' || err.message, success: false})

        }
        await user.remove()
        res.status(200).send({message: 'user deleted successfully'})
    }catch(error){
        console.log(error)
    }
})
