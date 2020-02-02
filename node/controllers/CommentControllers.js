const model=require('../models');
const Comments=model.Comment;
const Comment=()=>{

}
Comment.createComment=async(body)=>{
    let response=Comments.create({
        comment:body.comment,
        PostId:body.id,
        UserId:body.userid
    });
    return response;
}
module.exports=Comment;