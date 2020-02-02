const user = (app) => {
    const User = require('../controllers/Usercontroller')
    const Post = require('../controllers/PostController')
    const Like = require('../controllers/LikeController')
    const Comment = require('../controllers/CommentControllers')
    const Replycomment = require('../controllers/ReplycommentController')
    const Report = require('../controllers/ReportController')
    app.post('/signup', async (req, resp) => {
        let pro = await User.createUser(req.body.body);
        resp.send(pro)
    })

    app.post('/login', async (req, resp) => {
        var result = await User.getUser(req.body);
        resp.send(result)
    })
    app.get('/googlelogin',async (req,resp)=>{
        console.log(req.query)
        let{username}=req.query;
        var result=await User.getgoogleUser(username);
        resp.send(result)
    })
    app.get('/name', async (req, resp) => {
        let { id } = req.query
        var display = await User.getName(id);
        resp.send(display)
    })
    app.post('/like', async (req, resp) => {
        let result = await Like.createLike(req.body)
        resp.send(result)
    })
    app.post('/dislike', async (req, resp) => {
        let result = await Like.deleteLike(req.body)
        resp.send(result)
    })
    app.post('/comment', async (req, resp) => {
        let result = await Comment.createComment(req.body)
        resp.send(result)
    })
    app.post('/reply', async (req, resp) => {
        let result = await Replycomment.createReply(req.body)
        resp.send(result)
    })
    app.post('/report', async (req, resp) => {
        let { postid, userid } = req.body
        let result = await Report.createReport(postid, userid)
        resp.send(result)
    })
    app.get('/fetchreport', async (req, resp) => {
        let result = await Report.getReport();
        resp.send(result)
    })
    var multer = require('multer')
    const storage = multer.diskStorage({
        destination: "./images/uploads/",
        filename: function (req, file, cb) {
            const type = file.mimetype.replace('image/', '');
            cb(null, `${file.fieldname}-${Date.now()}.${type}`);
        }
    });

    var upload = multer({ storage: storage });
    app.post('/profile', upload.single('myImage'), async (req, resp) => {
        const l = req.file.path
        const content = req.body.content
        const img = `http://localhost:5003/${l}`
        const post = req.body.Post_type
        const id = req.body.id
        body = { content, img, post, id }
        console.log(body)
        const poststatus = await Post.createPost(body);
        resp.send(poststatus);
    });
    app.get('/instaprofile', async (req, resp) => {
        let { id } = req.query
        var display = await Post.getPost(id);
        resp.send(display)
    })
    app.get('/instapage', async (req, resp) => {
        var result = await Post.getPost1();
        resp.send(result)
    })
    app.post('/deletepost', async (req, resp) => {
        console.log('delete id', req.body)
        let { id } = req.body
        var show = await Post.deletePost(id);
        resp.send(show)
    })

}
module.exports = user;