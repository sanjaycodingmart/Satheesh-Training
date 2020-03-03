const model=require('../models');
const Likes=model.Like;

const Like=()=>{
    
}
Like.createLike=async(UserId,PostId)=>{
    let response=await Likes.create({
        PostId,
        UserId
    });
    return response;
}
Like.deleteLike=async (body)=>{
    let response=await Likes.destroy({
        where:{
            PostId:body.postid,
            UserId:body.userid
        }
    });
    return response;
}
module.exports=Like;