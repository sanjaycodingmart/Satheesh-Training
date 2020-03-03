const model=require('../models')
const UserinGroups=model.UserinGroups;

const UserinGroup=()=>{

}
UserinGroup.create=async(groupid,userid)=>{
    let response=await UserinGroups.create({
     GroupId:groupid,
        UserId:userid
    })
    return response;
}
UserinGroup.getGroup=async(UserId)=>{
    let response=await UserinGroups.findAll({
        attributes:['GroupId'],
        where:{
            UserId
        },
        include:[{
            model:model.Group,
            attributes:['Name']
        }]
    })

    let res=await UserinGroups.findAll({
        attributes:['UserId','GroupId'],
        where:{
            GroupId:response[0].dataValues.GroupId
        },
        include:[{
            model:model.User,
            attributes:['username','id']
        }]
    })
return response

}
UserinGroup.getusers=async(userid,GroupId)=>{
    const Op = require('sequelize').Op
    let response=await UserinGroups.findAll({
        attributes:['UserId'],
        where:{
            GroupId:
            {
                [Op.eq]:GroupId  
            },
            UserId:{
                [Op.not]:userid
            }
        } ,
        include:[{
            model:model.Group,
            attributes:['Name']
        }]
    })
    return response;
}

module.exports=UserinGroup;