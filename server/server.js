var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');

//get api routes
var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

//bodyparser midleware for parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//point static path to dist
//set static folder

app.use(express.static(path.join(__dirname, '../dist/myTaskList')));


////Set our api routes
app.use('/api2', index);
app.use('/api', tasks);


//catch all others routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/myTaskList/index.html') );
})

//set port
app.set('port',process.env.PORT | 3000);


//create server
var server = http.createServer(app);
//socket
var io = require('socket.io')(server);

server.listen(app.get('port'), () => {
  console.log(`Api running on localhost:${app.get('port')}`);
});


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
