// connecting to MongoDB
const mongoose = require('mongoose')
const constants = require('./constants')
function database (){
    mongoose.connect(constants.DATABASE_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("MongoDB is connected");

    })
    .catch((err) => {
        console.log("An error occured while connecting with the database");

    });

}
module.exports = database;