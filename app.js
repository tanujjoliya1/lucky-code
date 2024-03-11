var app = require('express')();
var http = require('http').Server(app);



var path = require('path')
var io=require('socket.io')(http);


app.get('/', function(req,res){

    var option= {
        root:path.join(__dirname)
    }
    var fileName= 'index.html';
    res.sendFile(fileName,option);

});


let users = [];

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join', (username) => {
    if (users.length >= 2) {
      socket.emit('full', 'Room is full');
      return;
    }

    users.push({ id: socket.id, username });
    socket.broadcast.emit('user joined', { username });

    if (users.length <= 2) {
      io.emit('ready');
    }
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit('user left', { id: socket.id });
  });
});









// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Broadcast a message to all connected clients
//   socket.broadcast.emit('broadcast', { message: 'A new user has joined the chat!' });

//   // Handle incoming messages
//   socket.on('message', (data) => {
//     console.log(`Received message from ${socket.username}:`, data.message);
//     io.emit('message', { user: socket.username, message: data.message });
//   });

//   // Handle user disconnections
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);

//     // Broadcast a message to all connected clients
//     socket.broadcast.emit('broadcast', { message: `User ${socket.username} has left the chat.` });
//   });

//   // Handle user joining with a username
//   socket.on('join', (username) => {
//     console.log(`User ${username} joined the chat.`);
//     socket.username = username;

//     // Broadcast a message to all connected clients
//     socket.broadcast.emit('broadcast', { message: `User ${username} has joined the chat.` });
//   });

//   // Handle user renaming
//   socket.on('rename', (newUsername) => {
//     console.log(`User ${socket.username} changed their name to ${newUsername}.`);
//     const oldUsername = socket.username;
//     socket.username = newUsername;

//     // Broadcast a message to all connected clients
//     socket.broadcast.emit('broadcast', { message: `User ${oldUsername} has changed their name to ${newUsername}.` });
//   });
// });











const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



// var users=0;
// var button;

// // connect a usr
// io.on('connection', function(socket){
//     console.log("user is connected");
//     // tptal user connected, this message for all users
//     users++;
//     // io.sockets.emit('total', {message: users +'total users'});

//     socket.onclick.emit('join', {message: button +'click here to connect'})
//     // button.onclick(function(data){
//     //     document.write('connect')
//     // })

//     socket.on.
// //  socket.send('a user is connected on front');
// // custom event
// // socket.emit('eventName', {note: 'server custom message'});


// // this is for curerent user connected
// socket.emit('current', {message:'welcome new user'});


// // this message for 2 connected user
// socket.broadcast.emit('current', {message: users+ 'users connected'});


















// // disconnect a usr
// socket.on('disconnect', function(){
//     console.log('a user disconnected')
// // tptal user disconnected, this message for all users
//     users--;
// // io.sockets.emit('total', {message: users +'total users'});
// socket.broadcast.emit('current', {message: users+ 'users connected'});





// })

// })