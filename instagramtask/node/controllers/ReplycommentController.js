const model=require('../models')
const Replycomments=model.Replycomment;
const Replycomment=()=>{

}
Replycomment.createReply=async(UserId,CommentId,reply)=>{
    let response=Replycomments.create({
        CommentId,
        UserId,
        reply
    });
    return response;
}
module.exports=Replycomment;