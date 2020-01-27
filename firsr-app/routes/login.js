const express = require('express')
const app = express()  
const client = require('../server/client');

app.get('/login',(req,resp)=>{
    const uname=req.query.username;
    const pwd=req.query.password;
    client.query(`select * from signup where username='${uname}' and password='${pwd}';`,(err,res)=>{

        if(err){
            resp.send({status:false});
        }
        else{
            resp.json({status:true});
        }
    })
})
module.exports = app;