const express = require('express');
const socket = require('socket.io');
const fs = require('fs');
const app = express();
var PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

app.use(express.static('public'));
console.log('Server is running');
const io = socket(server);

io.on('connection', (socket) => {
    console.log("New socket connection:" + socket.id)

    socket.on('register', (name) => {
        socket.name = name;
        io.emit('user registered', name);
      });

    socket.on('chat message', (message) => {
        io.emit('chat message', message);
      });
    
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
});
