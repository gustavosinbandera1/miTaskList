SocketBuffer  = require('./socketBuffer');
 db = require('../sqlSerices/sqlQuery');


class socketConexion extends SocketBuffer{
  constructor(io) {
    super();
    this._io = io;
    this._namespaceName = '';
    this._namespaceObject = {};
    this._devices = {};
    console.log('constructor socket conexion');
  }

  //almacena el namespace (si no existe) en un array y revisa si la conexion
  //es de un dispositivo o un usuario y retorna el tipo y el socket
  checkGeneralConections(callback) {
    console.log('buscando conexiones');

    this._io.on('connect', (socket) => {
      console.log('atendiendo conexion');
      this._email = this.getEmailUserFromSocket(socket);

      //se conecto un usuario
      if(this._email != undefined) {
          callback(true,socket);
      }else {
        callback(false,socket);//device connected
      }
    });
  }

  getEmailUserFromSocket(socket) {
    let temp_email = socket.handshake.query['email '];
    let email;
    if(temp_email) {
      //let temp =  temp_email.replace(/\s/g, '');
      email = temp_email.trim();
      console.log('los parametros del queryt', email);

      return email;
    }
    return undefined;
  }


  listenEventsUserSocket(client) {
     this.getDevicesByUser((devices) => {
      console.log('los devices', devices);

      this._devices = devices;
    });

    this.setRoomUser(this._email, client);
    console.log('room del usuario:', this._email);

    client.join(this._email);

    client.on('userConnection',(data) => {
      client.emit('connectionAccepted',this._devices);//emitimos dispositivos disponibles para este usuario
    });

    client.on('disconnect', () => {
      console.log('socket desconectado');
      this.deleteRoomUser(client);
    });

    client.on('command', (data) => {
      //data.command, data.email-owner para que el modulo pueda devolver respuesta dado el caso
      this._io.sockets.in(data.mac).emit('command', data);//emitimoscomando al dispositivo que requieran en data.mac
    });

  }


  handleDevicesConnection(deviceSocket,this_) {
    console.log('capturando funcion devices');

    let mac = deviceSocket.handshake.query.mac;
    deviceSocket.join(mac);

    this_.getDeviceByMacAndQueue(mac,function(device){
      //let email = this_.deviceInfo.email_user;
      let email = device.email_user;
      console.log('se capturo el dispositivo por su mac', device);
      let tempEmail = email.slice(0,email.indexOf('@'));
      console.log('esta es la variable temp', tempEmail);
      this_.listenDeviceCommands(deviceSocket, this_._io, tempEmail);
    });

  }

  listenDeviceCommands(deviceSocket,io,deviceOwner) {
    console.log('vamos a empezar a escuchar al modulo wifi......');
    //en data debe llegar el email del dueno, el estado de los pines del dispositivo
    deviceSocket.on('responseCommand',(data) => {
      //data contain room and namespace of owner
      //we need broadcast the response to all owners on namespace
      //when client emit any command to the device , the the device emit a response
      //to this general namespace and the server need to redirect this response to the client = owner

      io.sockets.in(data.email).emit('responseCommand', data);
    });

    deviceSocket.on('ADC', function(data){
      console.log('los datos', data);
      //io.of('/gustavosinbandera1').in('gustavosinbandera1').emit('ADC',data);
      io.sockets.in(deviceOwner).emit('ADC',data);
    });
  }

  getDeviceByMacAndQueue(mac,callback){
      console.log('vamos a hacer la consulta por mac', mac);
      let query = `select * from DEVICES where mac_device="${mac}" `;

      db.sendQuery(query, (err, device) => {
        if(err) {
          console.log('nada de datos mas bien error');
          return [];
        }else {
          let deviceInfo = device[0];
          console.log('este es el device: ',deviceInfo.email_user);
          ///this._devicesList[mac] = device[0];
          callback(deviceInfo);
        }
      });
  }



  getDevicesByUser(callback){
    console.log('vamos a hacer la consulta getdevicesByUser');
    let query = `select * from DEVICES where email_user="${this._email}@hotmail.com" `;

    db.sendQuery(query, (err, devices) => {
      if(err) {
        console.log('nada de usuarios');

        return [];
      }else {
        console.log('si hay datos');
        //this.devices = devices;
        callback(devices);
      }
    });


  }
}

module.exports = socketConexion;
