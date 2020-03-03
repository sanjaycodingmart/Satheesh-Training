const express = require('express')
const app = express();
const PORT = 5003;
const cors = require('cors')
const bodyParser = require('body-parser')
const user = require('./route/appRoute');
var server = require('http').Server(app)
var io = require('socket.io')(server);
app.use('/images', express.static(__dirname + "/images"));
app.use('/profile', express.static(__dirname + "/profile"));
app.use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb', extended: true }))
user(app)
const Users = require('./models').User
Users.findAll({
    attributes: ['id']
}).then(res => {
    res.map((user) => {
        createSocket(user.dataValues.id)
    }  
    )
})
const Chat = require('./controllers/ChatControllers')
const Message=require('./controllers/MessagesControllers')
let sockets = [];


function createSocket(data){  
   var res=io.of(data).on('connection', (socket) => {
        console.log('user connected',data);
        socket.on('insert_to_message', async(value) => {
            console.log(value)
            await Chat.createChat(value);
            sockets[value.receiverid].emit('send_message',{
                Messages: value.message,
                senderId: value.senderid,
                ReceiverId: value.receiverid
            })
        });
        socket.on('insert_to_group_message',async(value)=>{
            console.log('====>',value)
            Message.createMessage(value);
            value.usergroup.forEach(element => {
                console.log(element,"groupmessage")
                sockets[element].emit('send_group_message',{
                    Message: value.message,
                    UserId: value.senderid,
                    Usergroup: value.group,
                    username:value.username
                })
            });
        })
    });
    sockets[data]=res;
}   
    


server.listen(PORT,
    err => {
        if (err) console.log(`cannot listen port:${PORT}`)
        console.log(`server is listening on :http://localhost:${PORT}`);
    });