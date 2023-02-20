const jwt = require('jsonwebtoken')
const User = require('../model/user')

// a middleware to autheticate users 
const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorisation').replace('Bearer', '')
        const verified = jwt.verify(token, process.env.SECRET_JWT)
        const user = await User.findOne({_id:verified.userId, token:'tokens.token'})

        if(!user){
            console.log("Not verified")
        }
        req.token = token
        req.user = user
        next()
        
    }catch(error){
        res.status(404).send({message: err.message || 'Please authenticate' , success: false})

    }
}

module.exports = auth