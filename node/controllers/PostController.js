const model = require('../models')
const Posts = model.Post

const Post = () => {

}

Post.createPost = (body) => {
    let response=  Posts.create({
        content:body.content,
        img_url:body.img,
        post_type:body.post,
        UserId:body.id
    });
    return response;
}

Post.getPost = (id) => {
    let response = Posts.findAll({
        where: {
            UserId: id
        },includes:[{
            model:model.User
        }]
    })
    return response;
}

Post.getPost1=()=>{
    let response=Posts.findAll({
        where:{
            post_type:'public'
        },
        include: [{
            model: model.User,
            attributes: ['username']
        }]
    })
    return response;
}
Post.deletePost=(id)=>{
    let response=Posts.destroy({
        where:{
            id
        }
    })
    return response;
}

module.exports = Post;