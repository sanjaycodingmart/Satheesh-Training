const express = require('express')
// const cors = require('cors')
const app = express()
// app.use(express.Route());
// app.use(cors()); 
const client = require('./client');


app.get('/signup',(req,resp)=>{
    const name = req.query.name
    const mobile = req.query.mobile
    const username = req.query.username
    const password = req.query.password
    client.query(`insert into signup(name,mobile,username,password) values('${name}',${mobile},'${username}','${password}');`,(err,res)=>{
        if(err){
            resp.send({status:false});
        }
        else{
            resp.json({status:true});
        }
    });

})
module.exports = app;