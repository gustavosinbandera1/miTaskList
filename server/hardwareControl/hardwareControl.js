/* var Device = require('../models/deviceModel');

createDevice = (dataDevice, client ) =>{
  var device = new Device(dataDevice);
    device.save(function(err){
      if(err) {
        client.emit('registerDevice', false);
        return false;
      }
      else {
        client.emit('registerDevice', true);
        return true;
      }
  });
}


HardwareControl = (io) => {//we need receive username in order to create namespace
  let controller = io;
  //all client actually connected
  clientConnected = [];
  //all rooms available
  var rooms =  [];

  controller.use((socket, next ) => {
    let token = socket.handshake.query;
    checkAuthToken(token, function(error, authorized){
      if(error || !authorized){
        //handle error
        let err = new Error('Authentication error');
        err.data = {type: 'authentication_error'};
        next(err);
      }
        console.log('authentication OKK......');
        next();
    });
  });


  controller.on('connect', function(client){
    console.log('socket connected in this moment', client.id);

    client.on('registerDevice', (objDevice) => {
      if( createDevice(objDevice, client) ) {
        room.push(createRoom(objData, client));
      }
    });



    client.on('disconnect', () => {
      console.log('user disconnected');
    });

  });


  createRoom = (objData, client) => {
    let room = objData.mac + client.handshake.query.userName;
    return room;
  }

  checkAuthToken = function(token_ , callback) {
    //console.log(token_);
    if(token_) {
      return callback(false,token_);
    }
    return callback('user no authenticated');
  }

} */
//module.exports = HardwareControl;


/*
  let users = io.of('/users');
  users.on('connect', (user) => {
    console.log('nueva conexion en el nuevo namespace');

    user.on('disconnect', () => {
      console.log('ususario del namespace nuevo desconectado');

    })
  }); */
