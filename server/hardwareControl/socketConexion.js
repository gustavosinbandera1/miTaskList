 SocketBuffer  = require('./socketBuffer');
 db = require('../sqlSerices/sqlQuery');
class socketConexion extends SocketBuffer{
  constructor(io) {
    super();
    this._io = io;
    this._namespaceName = '';
    this._namespaceObject = {};
    this.deviceMac;
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
    if(temp_email) {
      let temp =  temp_email.replace(/\s/g, '');
      console.log('parametro del socket client en query=', temp);

      return temp;
    }
    return undefined;
  }


  listenEventsUserSocket(client) {
    this.getDevicesByUser((devices) => {
      console.log('los devices', devices);

      this._devices = devices;
    });

    this.setRoomUser(this._email, client);
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
      io.sockets.in(data.mac).emit('command', data);//emitimoscomando al dispositivo que requieran en data.mac
    });

  }

  handleDevicesConnection(deviceSocket) {
    console.log('capturando funcion devices');
    //get mac
    let mac = deviceSocket.handshake.query.mac;
    deviceSocket.join(mac);
    this.getDeviceByMacAndQueue(mac);
    this.listenDeviceCommands(deviceSocket, this._io);


  }

  listenDeviceCommands(deviceSocket,io) {
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
      io.sockets.in('gustavosinbandera1').emit('ADC',data);
    });
  }

  getDeviceByMacAndQueue(mac){
    console.log('vamos a hacer la consulta por mac');
    let query = `select * from devices where mac_device="${mac}" `;

    db.sendQuery(query, (err, device) => {
      if(err) {
        console.log('nada de datos mas bien error');

        return [];
      }else {
        this.deviceMac = device;
        console.log('este es el device: ',this.deviceMac);
        this._devicesList[mac] = device;
      }
    });
  }



  getDevicesByUser(callback){
    console.log('vamos a hacer la consulta');
    let query = `select * from devices where email_user="${this._email}@hotmail.com" `;

    db.sendQuery(query, (err, devices) => {
      if(err) {
        console.log('nada de datos mas bien error');

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
