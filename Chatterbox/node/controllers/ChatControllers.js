const model = require('../models');
const Users = model.User;
const Chats = model.Chats;

const Chat = () => {

}
Chat.createChat = async (data) => {
    await Chats.create({
        senderId: data.senderid,
        Messages: data.message,
        ReceiverId: data.receiverid
    }).then(response => {
        // console.log(response)
    })

}
Chat.getChats = async (id, recvid) => {
    // console.log(id,recvid)
    const Op = require('sequelize').Op
    let response = await Chats.findAll({
        where: {
            [Op.or]: [{
                senderId: id,
                ReceiverId: recvid
            }, {
                senderId: recvid,
                ReceiverId: id
            }
            ]
        }
    })

    return response;
}
Chat.getChatedUsers = async (id) => {
    var Op=require('sequelize').Op
    let res = await Chats.findAll({
        attributes:['ReceiverId'],     
        where: {
            senderId:id
        }
    })
    let array=[];
    res.forEach(element => {
        if(!array.includes(element.dataValues.ReceiverId)){
            array.push(element.dataValues.ReceiverId)
        }
    });
    let response=await Users.findAll({
        attributes:['username','profile','id'],
        where:{
            id:{
                [Op.in]:array
            }
        }
        })
    return response
   
}
module.exports = Chat;