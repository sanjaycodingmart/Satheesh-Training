const model = require('../models')
const Messages = model.Messages;

const Message = () => {

}

Message.createMessage = async (data) => {
    let response = await Messages.create({
        Message: data.message,
        GroupId: data.groupid,
        UserId: data.senderid
    })
}
Message.getMessages = async (userid, grpid) => {
    const Op = require('sequelize').Op;
    let response = await Messages.findAll({
        where: {
            GroupId:grpid
        },
        include:[{
            model:model.User,
            attributes:['username'],
           
        }]
    })
    // console.log("res====>",response)
    return response;
}




module.exports = Message;