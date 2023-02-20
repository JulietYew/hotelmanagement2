const ServiceRoomType = require('../service/service_roomType')
const constants = require('../constants')
const { MESSAGES } = constants


class ControllerRoomType {
    // create a roomtype
    async createRoomType(req, res) {
        const roomTypeName = req.body.name 
        try{
            const existingRoom = await ServiceRoomType.getRoomType({
                name:roomTypeName
            })
            if (existingRoom){
                res.status(404).send({message: MESSAGES.EXIST || err.message, success: false})
            }

        

            const newRoomType = new roomType({
                name: roomTypeName
            
            })
                await newRoomType.save()
        res.status(200).send({message: MESSAGES.CREATED, success: true, data:newRoomType });
    } catch(error){
        console.log(error)
    }

}
    // get a single roomtype
    async getRoomtype (req,res){
        const RoomTypeId = req.params.id
        try{
            const existingRoom = await ServiceRoomType.getRoomType({
                _id: RoomTypeId
            })
            if (!existingRoom){
                res.status(404).send({message: err.message || MESSAGES.NOTEXIST , success: false})

            }
            
           res.status(200).send({message: MESSAGES.FETCHED, success: true , data:existingRoom});

        }catch(error){
            console.log(error)
        }

    }

    // get all roomtypes
    async RoomTypes(req,res){
        try{
            const roomtype = await ServiceRoomType.getAllRoomTypes({})
            res.status(200).send({message: MESSAGES.FETCHED, success: true, data:roomtype });

        }catch(error){
            console.log(error)
        }

    }
    // edit a roomtype by id
    async editRoomType(req, res){
        const roomTypeId = req.params
        const editRoomType = req.body
        try{
            const existingRoomType = await ServiceRoomType.getRoomType({
                _id: roomTypeId
            
            })
            
            if(!existingRoomType) { 
                res.status(404).send({message: err.message || MESSAGES.NOTEXIST , success: false})
            }
            

          const newRoomType = await ServiceRoomType.editRoomType({roomTypeId: roomTypeId, editRoomType:editRoomType})
          res.status(200).send({message: MESSAGES.UPDATED, success: true, data:newRoomType});

        } catch(error){
            console.log(error)
        }

    }
    // delete a roomtype by id
    async deleteRoomType (req, res){
        const RoomTypeId = req.params.id 
        try{
           const existingRoom = await ServiceRoomType.getRoomType({
            _id: RoomTypeId
           }) 
           if(!existingRoom){
               res.status(404).send({message: err.message || MESSAGES.NOTEXIST , success: false})

           }
           const deletedRoomType = await ServiceRoomType.deleteRoomType(RoomId)
           res.status(200).send({message: MESSAGES.DELETED, success: true, data:deletedRoomType });

        }catch(error){
            console.log(error)
        }

    }

}

module.exports = new ControllerRoomType()
