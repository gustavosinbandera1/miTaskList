 SocketBuffer  = require('./socketBuffer');
 db = require('../sqlSerices/sqlQuery');
class socketConexion extends SocketBuffer{
  constructor(io) {
    super();
    this._io = io;
    this._namespaceName = '';
    this._namespaceObject = {};
    console.log('constructor socket conexion');
  }

  //almacena el namespace (si no existe) en un array y revisa si la conexion
  //es de un dispositivo o un usuario y retorna el tipo y el socket
  checkGeneralConections(callback) {
    console.log('buscando conexiones');

    this._io.of('').on('connect', (socket) => {
      console.log('atendiendo conexion');
      this._namespaceName = this.getNamespaceUserFromSocket(socket);
      this._email = this._namespaceName;
      //se conecto un dispositivo si no entra a este if
      if(this._namespaceName != undefined) {
        this.createNamespace(this._namespaceName);//este metodo verifica que el namespace no se hubiera creado antes
        this._namespaceObject = this._io.of('/'  + this._namespaceName);
        this._namespaceObject.on('connect', function(client){
          this._client = client;
          console.log('en el nuevo namespace');
          callback(true,client);
        });
      }else {
        //atendemos al device
        console.log('veamos de que s etgrata', socket);

        callback(false,this._client);
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
      client.in(roomDevice).emit('command', command);
    });

    client.on('hardwareResponse', (data) => {
      this.io.of(this._namespaceName).to(this.roomsUsers[client.id]).emit('hardwareResponse',data);
    });

  }

  handleDevicesConnection(type, client) {
    console.log('capturando funcion devices', client);

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
        ;
      }
    });
  }

}

module.exports = socketConexion;
