const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 5005;

const publicPath = path.join(__dirname,'../public');

//console.log(publicPath);
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//event listenere
io.on('connection',(socket)=>{
    console.log('new user conected.');

    socket.emit('newMessage', generateMessage('admin','Wellcome to the chat app!'));

    socket.broadcast.emit('newMessage',generateMessage('admin','new user joined'));

    socket.on('createMessage',(message, callback)=>{

        //io.emit('newMessage',generateMessage(message.from, message.text)); 
        socket.broadcast.emit('newMessage',generateMessage(message.from, message.text));  
        callback('i got this');
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage(coords.from, coords.latitude, coords.longitude));
    }); 

    socket.on('disconnect',()=>{
        console.log('disconnectingg ...');
    });
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});