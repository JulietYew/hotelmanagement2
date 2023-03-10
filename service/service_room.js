// a collection for the room
const Room = require('../model/room');
class ServiceRoom {
    // create a room
    async create (newRoom){
        return await Room.create(newRoom)
    }
    // get all rooms
    async getAllRooms (){
       return await Room.find(filter)

    }
    // edit a room by id
    async editRoomById (id, data){
        return await Room.findByIdAndUpdate({_id:id}, data);

    }
    // delete a room by id
    async deleteRoomById (id){
        return await Room.findByIdAndDelete({_id:id});
    }
    // get a room by id
    async getRoomById (id) {
        return await Room.findById({_id:id});
    }

}

module.exports = new ServiceRoom();