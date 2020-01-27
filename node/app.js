const express = require('express')
const app = express();
const PORT = 5003;
const cors = require('cors')
const bodyParser = require('body-parser')

const user = require('./route/appRoute');
app.use('/images', express.static(__dirname + "/images"));
app.get('/', (req, res) => {
    res.send('Index')
})
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
user(app)

// const db=require('./database/connect');
// db.authenticate()
//     .then(()=>console.log('database connected'))
//     .catch(err=>console.log("Error :"+err))

app.listen(PORT,
    err => {
        if (err) console.log(`cannot listen port:${PORT}`)
        console.log(`server is listening on :http://localhost:${PORT}`);
    });