const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const database = require('./database')
const dotenv = require('dotenv')
dotenv.config();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const router = require('./routes/room_routes')
const routerType = require('./routes/roomType_routes')
const auth = require('./middleware/auth')
//const userRoutes = require('./routes/userroutes')


const PORT = process.env.PORT || 5000;

app.use('/api/v1/room-types', routerType)
app.use('/api/v1/rooms', router)

app.post('/welcome', auth, (req,res) =>{
    res.status(200).send({message: 'Welcome', success: true})
})
app.listen(PORT, () =>{
    database();
    console.log(`Server started on port ${PORT}`)
});
module.exports = app;

