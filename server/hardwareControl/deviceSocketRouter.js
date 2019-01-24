/* var ctrl = require('../hardwareControl/deviceSocketController');

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
    }

  });
}
module.exports = HardwareControl;

 */

 var Buffer = require('./socketBuffer');
 //var bufferSocket = new Buffer();
class HardwareControl extends Buffer{

}
