const express = require('express');
const socket = require('socket.io');
const database = require('monk')('mongodb://admin:admin123@ds121955.mlab.com:21955/chat-app-testing');

var app = express();
const messageDB = database.get('messages')

var server = app.listen(3000,() => (
    console.log('Server started on port 3000')
));

var io = socket(server);

app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('Connection from ' + socket.id)
    messageDB.find({}).then((docs) => {
        console.log(docs)
        socket.emit('init', {
            'id': socket.id,
            'messages': docs
        })
    })
    socket.on('message', (data) => {
        io.sockets.emit('message', data);
        messageDB.insert({ name: data.handle, message: data.message})
    });
});