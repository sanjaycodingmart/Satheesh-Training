const express=require('express')
const app=express()
const client=require('./client')
var multer=require('multer')

const storage = multer.diskStorage({
    destination: "./images/uploads/",
    filename: function(req, file, cb){
       cb(null,file.originalname);
    }
 });
 
var upload=multer({storage:storage});
app.use('/images',express.static(__dirname+"/images/uploads"));

app.post('/insta',upload.single('myImage'),(req,resp)=>{
    const content=req.body.content
    const img=`http://localhost:8080/images/${req.file.originalname}`
    const post=req.body.Post_type
    const username=req.body.username
    const status=req.body.status
    client.query(`insert into post(content,img_url,posttype,username,status) values
     ('${content}','${img}','${post}','${username}','${status}');`,(err,res)=>{
        if(err){
            resp.send({status:false,details:err});
        }
        else {
            // client.query('select max(key_column) from post;',(err,res)=>{
            //     if(err) console.log('error1')
            //     else {
            //         schedules[res.rows[0].max]= cron.schedule('*/4 * * * *',()=>{
            //             console.log(res.rows[0].max)
            //             client.query(`delete from post where key_column=${res.rows[0].max} and create_at=;`,(err1,res1)=>{
            //                 if(err1) console.log('error')
            //                 else console.log('deleted')
                            
            //             });
            //             schedules[res.rows[0].max]=''
            //             console.log(schedules)
            //         })
            //     } 
            // })
            
            resp.send(res);
        }
    });
})

app.get('/instapage1',(req,resp)=>{
    client.query(`select * from post where posttype='public' and status='true';`,(err,res)=>{
        if(err)
            resp.send({status:false});
        else
            resp.send(res);
    })
})

// app.post('/deletepost',(req,resp)=>{
//     console.log(req.body)
//     const id=req.body.id
//     client.query(`update post set status='false',delete_at = NOW() where key_column=${id};`,(err,res)=>{
//         if(err)
//             resp.send({status:false});
//         else 
//             resp.send(res)
    
//         })

// });
module.exports = app;