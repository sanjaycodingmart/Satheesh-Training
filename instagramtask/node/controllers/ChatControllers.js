const model=require('../models');
const Users=model.User;
const Chats=model.Chats;

const Chat=()=>{

}
Chat.createChat=async(data)=>{
    console.log(data)
      await Chats.create({
        senderId:data.senderid,
        Messages:data.message,
        ReceiverId:data.receiverid
    }).then(response=>{
        // console.log(response)
    })
       
}
Chat.getChats=async(id,recvid)=>{
    console.log(id,recvid)
    const Op=require('sequelize').Op
    let response=await Chats.findAll({
        where:{
            [Op.or]:[{
                senderId:id,
                ReceiverId:recvid
            },{
                senderId:recvid,
                ReceiverId:id
            }
        ]
        }
        })

    return response
}
module.exports=Chat;