const model = require('../models')
const Posts = model.Post

const Post = () => {

}

Post.createPost = (body) => {
    let response = Posts.create({
        content: body.content,
        img_url: body.img,
        post_type: body.post,
        UserId: body.id
    });
    return response;
}

Post.getPost = (id) => {
    let response = Posts.findAll({
        where: {
            UserId: id
        }, order: [
            ['updatedAt', 'ASC']
        ],
        include: [{
            model: model.User,
            attributes: ['username']
        },
        {
            model: model.Like,
            attributes: ['UserId']
        },
        {
            model: model.Comment,
            include: [{
                model: model.User,
                attributes: ['username']
            },{
                model:model.Replycomment,
                attributes:['reply'],
                include: [{
                    model: model.User,
                    attributes: ['username']
                }]
            }]
        },{
            model:model.Report
        }
        ]
    })
    return response;
}

Post.getPost1 = () => {
    let response = Posts.findAll({
        where: {
            post_type: 'public'
        },
        order: [
            ['updatedAt', 'ASC']
        ],
        include: [{
            model: model.Like,
            attributes: ['UserId']
        }, {
            model: model.User,
            attributes: ['username']
        }, {
            model: model.Comment,
           include:[{
               model:model.User,
               attributes:['username']
             },{
               model:model.Replycomment,
               attributes:['reply'],
                include:[{
                   model:model.User,
                   attributes:['username']
               }]
           }]
        },
        {
            model:model.Report,
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
        }]
    })
    return response;
}
Post.deletePost = (id) => {
    let response = Posts.destroy({
        where: {
            id
        }
    })
    return response;

}


module.exports = Post;