 SocketBuffer  = require('./socketBuffer');
 db = require('../sqlSerices/sqlQuery');
class socketConexion extends SocketBuffer{
  constructor(io) {
    super();
    this._io = io;
    this._namespaceName = '';
    this._namespaceObject = {};
    this.deviceMac;
    console.log('constructor socket conexion');
  }

  //almacena el namespace (si no existe) en un array y revisa si la conexion
  //es de un dispositivo o un usuario y retorna el tipo y el socket
  checkGeneralConections(callback) {
    console.log('buscando conexiones');

    this._io.on('connect', (socket) => {
      console.log('atendiendo conexion');
      this._namespaceName = this.getNamespaceUserFromSocket(socket);
      this._email = this._namespaceName;
      socket.on('ADC', function(data){
        console.log('aqui tambien se escucha');
      });

      //se conecto un dispositivo si no entra a este if
      if(this._namespaceName != undefined) {
        this.createNamespace(this._namespaceName);//este metodo verifica que el namespace no se hubiera creado antes
        this._namespaceObject = this._io.of('/'  + this._namespaceName);
        this._namespaceObject.on('connect', function(client){
          this._client = client;
          callback(true,client);
        });
      }else {
        callback(false,socket);//device connected
      }
    });
  }

  getNamespaceUserFromSocket(socket) {
    let temp_namespace = socket.handshake.query['email '];
    if(temp_namespace) {
      let temp =  temp_namespace.replace(/\s/g, '');
      return temp;
    }
    return undefined;
  }


  listenEventsUserNamespace(client) {
    this.devices = this.getDevicesByUser();
    this.setRoomUser(this.email, client);
    client.join(this.email);

    client.on('userConnection',(data) => {
      client.emit('connectionAccepted',this.devices);//emitimos dispositivos disponibles para este usuario
    });

    client.on('disconnect', () => {
      console.log('socket desconectado');
      this.deleteRoomUser(client);
    });

    client.on('command', (data) => {
      //emit command to hardware
      let command = data.command;
      let roomDevice = data.room;//device mac representa un dispositivo fisico
      //client.of('').in(roomDevice).emit('command', command);
    });

    /*client.on('hardwareResponse', (data) => {
      this.io.of(this._namespaceName).to(this.roomsUsers[client.id]).emit('hardwareResponse',data);
    });*/

  }

  handleDevicesConnection(deviceSocket) {
    console.log('capturando funcion devices');
    //get mac
    let mac = deviceSocket.handshake.query.mac;
    this.getDeviceByMacAndQueue(mac);
    this.listenDeviceCommands(deviceSocket, this._io);


  }

  listenDeviceCommands(deviceSocket,io) {
    console.log('vamos a empezar a escuchar al modulo wifi......');

    deviceSocket.on('responseCommand',(data) => {
      //data contain room and namespace of owner
      //we need broadcast the response to all owners on namespace
      //when client emit any command to the device , the the device emit a response
      //to this general namespace and the server need to redirect this response to the client = owner
      io.of('gustavosinbandera1').in('gustavosinbandera1').emit('emtiendo datos desde el servidor');
    });

    deviceSocket.on('ADC', function(data){
      console.log('los datos', data);
      io.of('/gustavosinbandera1').in('gustavosinbandera1').emit('ADC',data);
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



  getDevicesByUser(){
    console.log('vamos a hacer la consulta');
    let query = `select * from devices where email_user="${this._email}@hotmail.com" `;

    db.sendQuery(query, (err, devices) => {
      if(err) {
        console.log('nada de datos mas bien error');

        return [];
      }else {
        console.log('si hay datos');
        this.devices = devices;
      }
    });
  }

}

module.exports = socketConexion;
