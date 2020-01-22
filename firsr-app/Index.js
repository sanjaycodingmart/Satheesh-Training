const express=require('express')
const app=express()

const cors = require('cors')
app.use(cors());
  
app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:'10mb'}))

const signup=require('./signup')
app.use(signup)

const login = require('./login')
app.use(login);

const insta=require('./instapage')
app.use(insta)

const profile=require('./profile')
app.use(profile)


app.listen(8080)