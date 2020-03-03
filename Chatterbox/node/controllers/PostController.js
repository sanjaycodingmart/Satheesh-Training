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
Post.getCount = async (data) => {
    const Op = require('sequelize').Op
    let response = await Posts.count({
        where: {
            post_type: "public",
            UserId: {
                [Op.in]: data
            }
        }
    })
    return response;
}
Post.getCount1 = async (id) => {
    let response = await Posts.count({
        where: {
            UserId: id
        }
    })
    return response;
}
Post.getPost = (count, id) => {
    let response = Posts.findAll({
        limit: 2,
        offset: 2 * count,
        where: {
            UserId: id
        }, order: [
            ['updatedAt', 'DESC']
        ],
        include: [{
            model: model.User,
            attributes: ['username', 'otpEnable']
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
            }, {
                model: model.Replycomment,
                attributes: ['reply'],
                include: [{
                    model: model.User,
                    attributes: ['username']
                }]
            }]
        }, {
            model: model.Report
        }
        ]
    })
    return response;
}

Post.getPost1 = async (count, data) => {
    const Op = require('sequelize').Op
    let response = await Posts.findAll({
        limit: 2,
        offset: 2 * count,
        where: {
            post_type: 'public',
            UserId: {
                [Op.in]: data
            }
        },
        order: [
            ['updatedAt', 'DESC']
        ],
        include: [
            {
            model: model.Like,
            attributes: ['UserId']
        }, {
            model: model.User,
            attributes: ['username','friendlist']
        }, {
            model: model.Comment,
            include: [{
                model: model.User,
                attributes: ['username']
            }, {
                model: model.Replycomment,
                attributes: ['reply'],
                include: [{
                    model: model.User,
                    attributes: ['username']
                }]
            }]
        },
        {
            model: model.Report,
            include: [{
                model: model.User,
                attributes: ['username']
            }, {
                model: model.Post,
                include: [{
                    model: model.User,
                    attributes: ['username']
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