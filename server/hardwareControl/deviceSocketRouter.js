var ctrl = require('../hardwareControl/deviceSocketController');

HardwareControl = (io) => {//we need pass username in order to create namespace
  let io_ = io;

  io_.use((socket, next ) => {
    ctrl.setEmail(socket.handshake.query['email ']);
    //si se establecio un usuario
    if(ctrl.getEmail() == null) {//maybe authenticate function work better
      let err = new Error('authentication error');
          err.data = {type: 'authentication_error'};
          next(err);
    }
    next();
  });

  io_.of('').on('connect', function(client){
    //vamos a crear el namespace
    //verificamos que sea un cliente y no un device por su email en el query
    if(client.handshake.query['email ']) {
      ctrl.createNamespaceIfNotExist(client.handshake.query['email ']);
      ctrl.handleNamespaceConnection(io, ctrl.getEmail());
    }else {
      console.log('se conecto un device');

      //se conecto un device
      //debemos tratarlo diferente, es un socket para ser controlado nada mas
      //solo debe recibir comando
    }


    /*escuchamos la conexion de un dispositivo, buscamos si esta registrado
    si es falso devemos desconectar el dispositivo del socket server
    de lo contrario debemos unir dicho dispositivo a su room correspondiente
    almacenamos el dispositivo en el array de dispositivos conectados
    y lo emitimos a su dueno en la room correspondiente a su email */

  });









}
module.exports = HardwareControl;


/* let users = io.of('/gustavosinbandera1');
users.on('connect', (user) => {
  console.log('nueva conexion en el nuevo namespace');

  user.on('disconnect', () => {
    console.log('ususario del namespace nuevo desconectado');

  })
}); */
