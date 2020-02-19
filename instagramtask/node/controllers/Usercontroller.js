const Users = require('../models').User;
// const model = require('../models')
var _ = require('underscore');
const User = () => {

}
User.createUser = async (body) => {
    try {
        let promise = await Users.create({
            name: body.name,
            username: body.username,
            mobile: body.mobile,
            email: body.email,
            password: body.Password,
            otpEnable: false
        })
        console.log("validation", promise)
        return (promise)
    }
    catch (e) {
        console.log('error')
        return e
    }
}
User.getUser = async (body) => {
    let { username, password } = body
    let response = await Users.findOne({
        attributes: ['id', 'otpEnable', 'username'],
        where: {
            username, password
        }
    })
    return response;
}
User.uploadProfile = async (userid, profile) => {
    let response = await Users.update({
        profile
    },
        {
            where: {
                id: userid
            }
        })
    return response;
}
User.getgoogleUser = (username) => {
    let response = Users.findOne({
        attributes: ['id'],
        where: {
            username
        }
    })
    return response;
}
User.getName = async(id) => {
    let response = await Users.findAll({
        attributes: ['id','username', 'otpEnable', 'profile','friendlist','userfriends'],
        where: {
            id
            }
        })
    return response;
}
User.getAcceptlist=async(id)=>{
    let response=await Users.findAll({
        attributes:['acceptlist'],
        where:{
            id
        }
    })
    return response;
}
User.getUpdate = async (otpenable, UserId) => {
    let response = await Users.update({
        otpEnable: otpenable
    }, {
        where: {
            id: UserId
        }
    })
    return response;
}
User.getUsers = async (id,usrname) => {
    const Op = require('sequelize').Op
    let response = await Users.findAll({
        attributes:['username','id','userfriends','profile'],
        where: {
            [Op.and]: [
                {
                    username: {
                        [Op.not]: 'admin'
                    }
                }, {
                    id: {
                        [Op.not]: id
                    }
                },
                {
                    username:{
                        [Op.like]:`${usrname}%`
                    }
                }
            ]
        }
    })
    return response
}
User.getMutualUsers=async(result,id)=>{
    const Op = require('sequelize').Op
    let res=await Users.findAll({
        attributes:['userfriends'],
        where:{
            id
        }
    })
    var mutual=_.intersection(res[0].dataValues.userfriends, result[0].dataValues.userfriends)
    let res1= await Users.findOne({
        attributes:['username'],
           where:{
            id:{
                [Op.in]:mutual
            }
        }
    })
    return(res1); 
}
User.getRequest=async(id)=>{
   let response=await Users.findAll({
        attributes:['friendlist'],
        where:{
            id
        }
   })
return response
}
User.getRequestUsers=async(res)=>{
    var Op=require('sequelize').Op
    var array;
    var arr=[];
    res[0].dataValues.friendlist?array=(res[0].dataValues.friendlist.split(',')):array=[];
    array.forEach(element => {
        arr.push(parseInt(element))
    });
    let response=await Users.findAll({
        attributes:['username','id'],
        where:{
            id:{
                [Op.in]:arr
            }
        }
    })
    console.log(response)
    return response;
}
User.setRequest=async(id,reqid)=>{
   var result= await Users.findAll({
        attributes:['friendlist'],
        where:{
            id:reqid
        }
    })
    var array;
    result[0].dataValues.friendlist?array=Array(result[0].dataValues.friendlist):array=[];
    array.push(id)
    
    let response=await Users.update({
        friendlist:String(array)
    },{
        where:{
            id:reqid
        }
    })
    return response
}
User.acceptRequest=async(id,accid)=>{
    var result=await Users.findAll({
        attributes:['friendlist','userfriends'],
            where:{
                id
            }
    })

    var res=result[0].dataValues.friendlist.split(',')
    res.splice(res.indexOf(accid),1)   
    var re=result[0].dataValues.userfriends?result[0].dataValues.userfriends:[]
    re.push(accid)
    await Users.update({
            friendlist:res.toString() ,
            userfriends:re
        },{
            where:{
                id
        }
    })
    result= await Users.findAll({
        attributes:['acceptlist'],
            where:{
                id:accid
            }
    })
    var array;
    array = result[0].dataValues.acceptlist?(result[0].dataValues.acceptlist.split(',')):[];
    array.push(id)  
    let response=await Users.update({
        acceptlist:array.toString()
    },
        {
            where:{
                id:accid
            }
        }
    )
    return response;
}
User.getUserfriends=async(id)=>{
    var Op=require('sequelize').Op
    let res=await Users.findAll({
     attributes:['userfriends'],
        where:{
            id
        }
    })
 var array=res[0].dataValues.userfriends
    if(array){
        let response=await Users.findAll({
            attributes:['username','id','profile'],
            where:{
            id:{
                [Op.in]:array
            }
        }
        })
        return response
    }
 
}
User.deleteUser=async(id,delid)=>{
    let res=await Users.findOne({
        attributes:['userfriends'],
        where:{
            id
        }
    })
    var array=res.dataValues.userfriends
    array.splice(array.indexOf(delid), 1);
    let response=await Users.update({
        userfriends:array
    },{ 
            where:{
                id
            }
        }
    )
    return response;    
}
User.getchatUsers=async(id,usrname)=>{
    const Op = require('sequelize').Op
    let response=await Users.findAll({
        attributes:['username','id','profile'],
        where: {
            [Op.and]: [
                {
                    username: {
                        [Op.not]: 'admin'
                    }
                }, {
                    id: {
                        [Op.not]: id
                    }
                },
                {
                    username:{
                        [Op.like]:`${usrname}%`
                    }
                }
            ]
        }
    })
    return response
}
User.deleteImage = async (id) => {
    let response = await Users.update({
        profile: ''
    }, {
        where: {
            id
        }
    })
    return response;
}

module.exports = User;