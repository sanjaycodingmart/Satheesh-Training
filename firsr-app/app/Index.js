const express=require('express')
const app=express()

const cors = require('cors')
app.use(cors());

app.use('/images',express.static(__dirname + "/images"));
  
app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:'10mb'}))

const signup=require('../routes/signup')
app.use(signup)

const login = require('../routes/login')
app.use(login);

const insta=require('../routes/instapage')
app.use(insta)

const profile=require('../routes/profile')
app.use(profile)


app.listen(8080)