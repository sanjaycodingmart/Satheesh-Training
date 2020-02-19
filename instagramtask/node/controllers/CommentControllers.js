const model=require('../models');
const Comments=model.Comment;
const Comment=()=>{

}
Comment.createComment=async(UserId,PostId,comment)=>{
    console.log('comment:',UserId,PostId,comment)
    let response=Comments.create({
        comment,
        PostId,
        UserId
    });
    return response;
}
Comment.remove=async(id)=>{
    let response=Comments.destroy({
        where:{
            id
        }
    })
    return response;
}
module.exports=Comment;