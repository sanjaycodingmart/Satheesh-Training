const model=require('../models')
const Replycomments=model.Replycomment;
const Replycomment=()=>{

}
Replycomment.createReply=async(body)=>{
    let response=Replycomments.create({
        CommentId:body.e,
        UserId:body.userid,
        reply:body.reply
    });
    return response;
}
module.exports=Replycomment;