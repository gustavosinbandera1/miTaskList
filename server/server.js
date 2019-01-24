var app = require('./config/app');//all server route configuration
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
app.set('socketio', io);

var Admin = require('./hardwareControl/adminConexion');









//console.log('los usuarios:', temp.getUsers());

//const uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');
var db = 'mongodb://gustavosinbandera1:nicolas901028@ds157509.mlab.com:57509/mytasklist_gustavo';

mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true})
.then(() => {})
.catch((err) => {});
server.listen(app.get('port'), () => {
  console.log(`Api running on localhost:${app.get('port')}`);
});


var adminConexion = new Admin(io);

//conexion en tiempo real
//control = require('./hardwareControl/deviceSocketRouter');
//control(io);

