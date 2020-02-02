const model=require('../models');
const Likes=model.Like;

const Like=()=>{
    
}
Like.createLike=async(body)=>{
    let response=await Likes.create({
        PostId:body.id,
        UserId:body.userid
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