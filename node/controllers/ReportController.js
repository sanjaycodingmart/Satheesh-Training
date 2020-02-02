const model=require('../models')
const Reports=model.Report;
 
const Report=()=>{

}
Report.createReport=async(postid,userid)=>{
    let responces=await Reports.findOne({
        where:{
            PostId:postid,
            UserId:userid
        }
    })
    if(!responces){
    responces=Reports.create({
        PostId:postid,
        UserId:userid
    })
    }
    return responces;
}
Report.getReport=async()=>{
    let response=await Reports.findAll({
        include:[{
            model:model.User,
            attributes:['username']
        },{
            model:model.Post,
            include:[{
                model:model.User,
                attributes:['username']
            }]
        }]
    })
    return response;
}
module.exports=Report;