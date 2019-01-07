var app = require('./config/app');
var path = require('path');
var http = require('http');
var server = http.createServer(app);


var mongoose = require('mongoose');
var db = 'mongodb://gustavosinbandera1:nicolas901028@ds157509.mlab.com:57509/mytasklist_gustavo';

mongoose.connect(db, {useNewUrlParser: true})
.then(() => {})
.catch((err) => {});





server.listen(app.get('port'), () => {
  console.log(`Api running on localhost:${app.get('port')}`);
});
/*
//socket
var io = require('socket.io')(server);




//real time communication
 clientListName = [];
io.on('connection', (socket) => {

  clientListName.push(socket.handshake.query.username);
  io.emit('updateSocketList', clientListName);
  io.emit('addUserToSocketList', socket.handshake.query.userName);
  console.log('el socket se ha conectado');
  console.log( socket.handshake.query);

  // Broadcast messages
  socket.on('send-message', (data) => {
    console.log('recibiedo mensaje');
    console.log(data);
    io.emit('message-received', data);
  });

  socket.on('message', (m) => {
    console.log('[server](message): %s', JSON.stringify(m));
    io.emit('message', m);
});

  //disconnected socket
  socket.on('disconnect', () => {
    let username = socket.handshake.query.userName;
    let userIndex = clientListName.indexOf(socket.handshake.query.username);
    if(userIndex != -1) {
      clientListName.splice(userIndex, 1);
      io.emit('updateSocketList', clientListName);
     // io.emit('removeUserfromSocketList', username);
    }
  })
})
*/
