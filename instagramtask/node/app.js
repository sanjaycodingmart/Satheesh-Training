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
let sockets = [];
function createSocket(data) {
    var res = io.of(data).on('connection', function (socket) {
        console.log("connection", data)
        socket.on('insert to message', async (data) => {
            await Chat.createChat(data);
            sockets[data.receiverid].emit('send message',{
                Messages:data.message,
                senderId: data.senderid
            })
        }) 
    })
    sockets[data] = res
}



server.listen(PORT,
    err => {
        if (err) console.log(`cannot listen port:${PORT}`)
        console.log(`server is listening on :http://localhost:${PORT}`);
    });