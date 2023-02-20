const ServiceRoom = require('../service/service_room')
const constants = require('../constants')
const { MESSAGES } = constants


class ControllerRoom {

    // create a room
    async createRoom(req, res) {
        const roomName = req.body.name , roomType = req.body.type, roomPrice = req.body.price;
        try{
            // check if rooms exist
            const existingRoom = await ServiceRoom.getRoomById({
                name:roomName
            })
            if (existingRoom){
                res.status(404).send({message: MESSAGES.EXIST || err.message, success: false})
            }

        
        // create a new room
        const newRoom = new room({
            name: roomName,
            roomType: roomType._id,
            price: roomPrice


        })
            await newRoom.save()
            res.status(200).send({message: MESSAGES.CREATED, success: true, data:newRoom });
        }catch(error){
        console.log(error)
    }

}


    
    // get a single 
    async getRoom (req,res){
        const RoomId = req.params.id
        // check if the room exist
        try{
            const existingRoom = await ServiceRoom.getRoomById({
                _id: RoomId
            })
            if (!existingRoom){
                res.status(404).send({message: err.message || MESSAGES.NOTEXIST , success: false})

            }
            
           res.status(200).send({message: MESSAGES.FETCHED, success: true , data:existingRoom});

        }catch(error){
            console.log(error)
        }

    }

    
    
    // get all rooms
    async getRooms(req,res){
        try{
            const rooms = await ServiceRoom.getAllRooms({})
            res.status(200).send({message: MESSAGES.FETCHED, success: true, data:rooms });

        }catch(error){
            console.log(error)
        }

    }
    // edit a room by 
    async editRoom(req, res){
        const roomId = req.params
        const editRoom = req.body
        // check if the room to edit exist
        try{
            const existingRoom = await ServiceRoom.getRoomById({
                _id: roomId
            
            })
            
            if(!existingRoom) { 
                res.status(404).send({message: err.message || MESSAGES.NOTEXIST , success: false})
            }
            

          const newRoom = await ServiceRoom.editRoomById({roomId: roomId, editRoom:editRoom})
          res.status(200).send({message: MESSAGES.UPDATED, success: true, data:newRoom});

        } catch(error){
            console.log(error)
        }

    }
    
    // delete a room by id
    async deleteRoom (req, res){
        const RoomId = req.params.id 
        try{
           const existingRoom = await ServiceRoom.getRoomById({
            _id: RoomId
           }) 
           if(!existingRoom){
               res.status(404).send({message: err.message || MESSAGES.NOTEXIST , success: false})

           }
           const deletedRoom = await ServiceRoom.deleteRoomById(RoomId)
           res.status(200).send({message: MESSAGES.DELETED, success: true, data:deletedRoom });

        }catch(error){
            console.log(error)
        }

    }



}
module.exports = new ControllerRoom();

