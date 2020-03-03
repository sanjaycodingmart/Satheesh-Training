const user = (app) => {

    key = 'qwerty12345'
    const User = require('../controllers/Usercontroller')
    const Post = require('../controllers/PostController')
    const Like = require('../controllers/LikeController')
    const Comment = require('../controllers/CommentControllers')
    const Replycomment = require('../controllers/ReplycommentController')
    const Report = require('../controllers/ReportController')
    const Otp = require('../controllers/OtpController')
    var Chat=require('../controllers/ChatControllers')
    var Group=require('../controllers/GroupControllers')
    var Message=require('../controllers/MessagesControllers')
    var UserinGroup=require('../controllers/UserinGroupsControllers')
    var otpGenerator = require('otp-generator')
    var jwt = require('jsonwebtoken');


    app.post('/signup', async (req, resp) => {
        let pro = await User.createUser(req.body);
        // var otp = await otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        if (pro) {
            var token = jwt.sign({ userid: pro.id }, key, { expiresIn: 60 * 60 * 24 });
        }
        // if (pro) {
        //     await Otp.setOtp(otp, pro.id)
        // }
        if (!pro.errors) {
            pro.dataValues.token = token
            resp.send(pro)
        }
        resp.send(pro)

    })
    app.post('/login', async (req, resp) => {
        var result = await User.getUser(req.body);
        
        // var otp = await otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        if (result) {
            var token = jwt.sign({ userid: result.id }, key, { expiresIn: 60 * 60 * 24});
        }
        // if (result && !result.otpEnable) {
        //     await Otp.setOtp(otp, result.id)
        // }    
        if (result)
            result.dataValues.token = token
        resp.send(result)
    })
    app.get('/details',async(req,resp)=>{
        let id=req.query.id
        var result=await User.getDetails(id.toString());
        resp.send(result)
    })
    app.post('/otpset', async (req, resp) => {
        var token = req.headers.authorization
        try {
            jwt.verify(token, key, async (err, authData) => {
                if (err) resp.send('401')
                else {
                    var id = authData.userid
                    var otpenable = req.body.state
                    var result = await User.getUpdate(otpenable, id)
                    resp.send(result)
                }
            })
        }
        catch (e) {
            resp.send('402')
        }
    })
    app.post('/otp', async (req, resp) => {
        var token = req.headers.authorization
        try {
            jwt.verify(token, key, async (err, authData) => {
                if (err) resp.send('401')
                else {
                    var userid = authData.userid
                    let { otp } = req.body
                    var result = await Otp.getOtp(otp, userid);
                    resp.send(result)
                }
            })
        }
        catch (e) {
            resp.send('402')
        }
    })
    app.get('/otpcheck', async (req, resp) => {
        var token = req.headers.authorization
        try {
            jwt.verify(token, key, async (err, authData) => {
                if (err) resp.send('401')
                else {
                    var userid = authData.userid
                    var result = await Otp.check(userid)
                    resp.send(result)

                }
            })
        } catch (e) {
            resp.send('402')
        }
    })
    app.get('/googlelogin', async (req, resp) => {
        let { username } = req.query;
        var result = await User.getgoogleUser(username);
        resp.send(result)
    })
    app.get('/name', async (req, resp) => {
    var token = req.query.token
        jwt.verify(token, key, async (err, authData) => {
            if (err) resp.send('401')
            else {
                var id = authData.userid;
                var display = await User.getName(id);
                resp.send(display)
            }
        })
    } )
    app.get('/acceptlist',async(req,resp)=>{
        var token=req.headers.authorization
        jwt.verify(token,key,async(err,authData)=>{
            if(err) console.log(err)
            else{
                var id=authData.userid
                var result=await User.getAcceptlist(id)
                resp.send(result)
            }
        })
    })
    app.post('/like', async (req, resp) => {
        var token = req.headers.authorization
        try {
            jwt.verify(token, key, async (err, authData) => {
                if (err) resp.send('401')
                else {
                    var userid = authData.userid
                    var postid = req.body.id
                    let result = await Like.createLike(userid, postid)
                    resp.send(result)
                }
            })
        } catch (e) {
            resp.send('402')
        }
    })
    app.post('/dislike', async (req, resp) => {
        let result = await Like.deleteLike(req.body)
        resp.send(result)
    })
    app.post('/comment', async (req, resp) => {
        var token = req.headers.authorization
        jwt.verify(token, key, async (err, authData) => {
            if (err) resp.send('401')
            else {
                var userid = authData.userid
                var postid = req.body.id
                var comment = req.body.comment
                let result = await Comment.createComment(userid, postid, comment)
                resp.send(result)
            }
        })

    })
    app.post('/reply', async (req, resp) => {
        var token = req.headers.authorization
        try {
            jwt.verify(token, key, async (err, authData) => {
                if (err) resp.send('401')
                else {
                    var userid = authData.userid
                    var comment = req.body.e
                    var reply = req.body.reply
                    let result = await Replycomment.createReply(userid, comment, reply)
                    resp.send(result)
                }
            })
        }
        catch (e) {
            resp.send('402')
        }
    })
    app.post('/report', async (req, resp) => {
        let { postid } = req.body
        var token = req.headers.authorization
        try {
            jwt.verify(token, key, async (err, authData) => {
                if (err) resp.send('401')
                else {
                    var userid = authData.userid
                    let result = await Report.createReport(postid, userid)
                    resp.send(result)
                }
            })
        }
        catch (e) {
            resp.send('402')
        }
    })

    app.get('/fetchreport', async (req, resp) => {
        let result = await Report.getReport();
        resp.send(result)
    })
    var multer = require('multer')
    const storage = multer.diskStorage({
        destination: "./images/uploads/",
        filename: function (req, file, cb) {
            if (file.mimetype == 'video/mp4')
                var type = file.mimetype.replace('video/', '');
            else
                type = file.mimetype.replace('image/', '');
            cb(null, `${file.fieldname}-${Date.now()}.${type}`);
        }
    });
    var upload = multer({ storage: storage });
    app.post('/profile', upload.single('myImage'), async (req, resp) => {
        const l = req.file.path
        var token = req.headers.authorization
        try {
            jwt.verify(token, key, async (err, authData) => {
                if (err) resp.send('401')
                else {
                    var id = authData.userid
                    const content = req.body.content
                    const img = `http://localhost:5003/${l}`
                    const post = req.body.Post_type
                    body = { content, img, post, id }
                    var poststatus = await Post.createPost(body);
                    resp.send(poststatus);
                }
            })
        }
        catch (e) {
            resp.send('402')
        }

    });
    app.get('/instaprofile', async (req, resp) => {
        var token = req.headers.authorization
        try {
            jwt.verify(token, key, async (err, authData) => {
                if (err) resp.send('401')
                else {
                    var id = authData.userid
                    var display = await Post.getPost(parseInt(req.query.offset), id);
                    resp.send(display)
                }
            })
        }
        catch (e) {
            resp.send('402')
        }
    })
    app.post('/instapage', async (req, resp) => {
        var result = await Post.getPost1(parseInt(req.body.offset),req.body.acceptlist);
        resp.send(result)
    })
    app.post('/deletepost', async (req, resp) => {
        // console.log('delete id', req.body)
        let { id } = req.body
        var show = await Post.deletePost(id);
        // console.log('show:', show)
        resp.send({ status: true, result: show })
    })
    app.get('/remove', async (req, resp) => {
        let { id } = req.query
        var result = await Comment.remove(id);
        resp.send(result)
    })
    const storage1 = multer.diskStorage({
        destination: './profile/uploads',
        filename: function (req, file, cb) {
            // console.log('file:', file.mimetype)
            var type = file.mimetype.replace('image/', '')
            cb(null, `${file.fieldname}-${Date.now()}.${type}`);
        }
    });
    const upload1 = multer({ storage: storage1 })
    app.post('/upload', upload1.single('profile'), async (req, resp) => {
        var token = req.headers.authorization
        var l = req.file.path
        jwt.verify(token, key, async (err, authData) => {
            if (err) console.log(err)
            else {
                var userid = authData.userid
                const profile = `http://localhost:5003/${l}`
                var result = await User.uploadProfile(userid, profile);
                resp.send(result)
            }

        })

    })
    app.get('/deleteimage', async (req, resp) => {
        var token = req.headers.authorization
        jwt.verify(token, key, async (err, authData) => {
            if (err) console.log(err)
            else {
                var userid = authData.userid
                var result = await User.deleteImage(userid)
                resp.send(result)
            }
        })
    })
    app.post('/getcount', async (req, resp) => {
        var data=req.body.accept
        var result = await Post.getCount(data);
        resp.send({ status: true, count: result })
    })
    app.get('/getcount1', async (req, resp) => {
        var token = req.headers.authorization
        jwt.verify(token, key, async (err, authData) => {
            if (err) console.log(err)
            else {
                var id = authData.userid
                var result = await Post.getCount1(id);
                resp.send({ status: true, count: result })
            }
        })

    })
    app.get('/username', async (req, resp) => {
        var token = req.headers.authorization
        // if (token.split(' ')[1]) token = token.split(' ')[1]
        jwt.verify(token,key,async(err,authData)=>{
            if(err) console.log(err)
            else{
                var id=authData.userid
                var username=req.query.username
                var result = await User.getUsers(id,username);
                if(result){
                    let result1=await User.getMutualUsers(result,id)
                    result[0].dataValues.mutual=result1
                    resp.send(result)
                }
           }
        })
    })
    app.get('/usernames',async(req,resp)=>{
        var token=req.query.token
        jwt.verify(token,key,async(err,authData)=>{
            if(err) resp.send('401')
            else{
                var id=authData.userid
                var uname=req.query.username
                let result=await User.getchatUsers(id,uname)
                resp.send(result)
            }
        })
    })
    app.get('/requsers',async(req,resp)=>{
        var token=req.headers.authorization
        jwt.verify(token,key,async(err,authData)=>{
            if(err) console.log(err)
            else{
                var id=authData.userid
                var result=await User.getRequest(id);
                var res= await User.getRequestUsers(result)
                resp.send(res)
            }
        })
    })
    app.get('/request',async(req,resp)=>{
        var token = req.headers.authorization
        jwt.verify(token,key,async(err,authData)=>{
            if(err) console.log(err)
            else{
            var id=authData.userid
            var reqid=req.query.id
            var result=await User.setRequest(id,reqid)
            resp.send({status:true,value:result})
            }
        })
    })
    app.get('/accept',async(req,resp)=>{
        var token=req.headers.authorization
        jwt.verify(token,key,async(err,authData)=>{
            if(err) console.log(err)
            else{
                var id=authData.userid
                var accid=req.query.id
                var result=await User.acceptRequest(id,accid)
                resp.send(result)
            }
        })
    })
    app.get('/userfriends',async(req,resp)=>{
        var token=req.headers.authorization
        jwt.verify(token,key,async(err,authData)=>{
            if(err) resp.send('401')
            else{
                var userid=authData.userid
                var result=await User.getUserfriends(userid)
                resp.send(result)
            }
        })
    })
    
    app.get('/deleteuser',async(req,resp)=>{
        var token=req.headers.authorization
        jwt.verify(token,key,async(err,authData)=>{
            if(err) console.log(err)
            else{
                var userid=authData.userid
                var delid=req.query.id
                var result=await User.deleteUser(userid,delid)
                resp.send(result)
            }
        })
    })
    app.get('/getchats',async(req,resp)=>{
        var token=req.headers.authorization
        jwt.verify(token,key,async(err,authData)=>{
            if(err) console.log(err)
            else{
                var id=authData.userid
                var recvid=req.query.recid
                // console.log(String(recvid))
                var result=await Chat.getChats(String(id),String(recvid));
                resp.send(result)
            }
        })
    })
    app.get('/allchats',async(req,resp)=>{
        var token=req.headers.authorization
        jwt.verify(token,key,async(err,authData)=>{
            if(err) console.log(err)
            else{
                var id=authData.userid
                var result=await Chat.getChatedUsers(id.toString());
                resp.send(result)
            }
        })
    })
    app.post('/addgroup',async(req,resp)=>{
        console.log('====>',req.body.addid)
        var token=req.headers.authorization
        jwt.verify(token,key,async(err,authData)=>{
            if(err) console.log(err)
            else{
                var userid=authData.userid;
                var name=req.body.name;
                var addid=req.body.addid;
                addid.push(userid)
                var res=await Group.createGroup(name,userid);
                addid.forEach(element => {
                   let result=  UserinGroup.create(res.dataValues.id,element)
                });
                resp.send({status:true})
            }
        })
    })
    app.get('/getgroup',async(req,resp)=>{
        var token=req.headers.authorization
        jwt.verify(token,key,async(err,authData)=>{
            if(err) resp.send('401')
            else{
                var id=authData.userid;
                let result=await UserinGroup.getGroup(id);
                // console.log("result",result)
                resp.send(result)
            }
        })
    })
    app.get('/getuseringroup',async(req,resp)=>{
        var token=req.headers.authorization;
        jwt.verify(token,key,async(err,authData)=>{
            if(err) resp.send('401')
            else{
                var userid=authData.userid
                var grpid=req.query.id;
                let result=await UserinGroup.getusers(userid,grpid);
                resp.send(result)
            }
        })
    })
    app.get('/getgroupchats',async(req,resp)=>{
        var token=req.headers.authorization
        jwt.verify(token,key,async(err,authData)=>{
            if(err) resp.send('401')
            else{
                var userid=authData.userid
                var grpid=req.query.grpid;
                let result=await Message.getMessages(userid,grpid);
                resp.send(result)
            }
        })
    })
}
module.exports = user;   
