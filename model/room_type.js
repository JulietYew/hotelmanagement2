const mongoose = require('mongoose')
let RoomType;
try{
  RoomType = mongoose.model('RoomType')
}catch(e){
  const Schema = mongoose.Schema
  const roomTypeSchema = new Schema({
  name: {
    type: String,
    required: true,  
  },
  description: {
    type: String
  }

}, {timestamps: true});
RoomType = mongoose.model('RoomType', roomTypeSchema);

}


module.exports = {RoomType};
