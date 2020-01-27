const express=require('express')
const app=express()
const client=require('../server/client')
app.get('/instaprofile',(req,resp)=>{
    const date=new Date();
    const username = req.query.username

    const time = new Date(date.setMinutes(date.getMinutes()-2));
    
    var year=time.getFullYear();
    var month=time.getMonth()+1;
    var day=time.getDate();
    var hour=time.getHours();
    var min=time.getMinutes();
    var sec=time.getSeconds();

    var string=year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;

    const q = `delete from post where created_at < timestamp '${string}';`

    client.query(q,(err1,res1)=>{
        if(err1) console.log('error occured!')
        else{
            client.query(`select * from post where username='${username}';`,(err,res)=>{
                if(err)
                    resp.send({status:false});
                else{
                    resp.send(res);
                }
            })
        }
    })
    
})
module.exports= app;