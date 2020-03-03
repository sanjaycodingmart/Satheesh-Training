const model=require('../models')
const Groups=model.Group;
 
const Group=()=>{
    
}
Group.createGroup=async(name,userid)=>{
   let response= await Groups.create({
        AdminId:userid,
        Name:name
    })
    return response;
}


module.exports=Group;