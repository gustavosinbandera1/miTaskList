var db = require('../sqlSerices/sqlQuery');
class SocketBuffer  {
  constructor() {
    this._users = [];//user availables in all namespaces
    this._namespaceQueue = [];
    this._roomsUsers = {};
    this._roomsDevices = {};
    this._email = null;
    this._socketList = {},
    this._devicesList = [];


    console.log('constructor buffer');

  }


  setDeviceList(mac_device) {
    let query = `select * from devices where mac_device="${mac_device}"`
    db.sendQuery(query, (err, device) => {
      if(err) {

      }else {
        this._devicesList[mac_device] = device;
        console.log('agregando a la lista', this._devicesList);
      }
    });
    //this._devicesList.push(device_mac);
  }

  getDeviceList() {
    return this._devicesList;
  }

  setEmail(email) {
    this._email = email;
  }
  getEmail() {
    return this._email;
  }
  setUser(name) {
    this._users.push(name);
  }
  getUsers() {
    return this._users;
  }
  setNamespaceQueue(namespace_name) {
    this._namespaceQueue.push(namespace_name);
  }
  getNamespaceQueue() {
    return this._namespaceQueue;
  }

  setRoomUser(roomName, socketClient) {
    this._roomsUsers[socketClient.id] = roomName
  }
  getRoomsUser() {
    return this._roomsUsers;
  }

  setRoomDevice(mac,owner) {
    this._roomsDevices[mac] = owner;
  }

  getRoomDevice() {
    return this._roomsDevices;
  }
  deleteRoomUser(client){
    delete this._roomsUsers[client.id];
  }

  getRoomsByEmail(email) {
    let myKey = '';
    Object.keys(this._roomsUsers).filter(function(key) {
      if(this._roomsUsers[key] == email) {
        myKey = key;
      }
    });
    return myKey;
  }

  namespaceExist(namespace_name) {
   return  this.searchObjectOnArray(namespace_name,this._namespaceQueue);
  }

  searchObjectOnArray(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id === nameKey) {
        return true;
      }
    }
   return false;
  }

  deleteNamespace(namespace){
    let index = this.namespaceQueue.indexOf(namespace);
    if(index > -1) {
      namespaceQueue.splice(index,1);
    }
  }

  setSocketList(socket) {
    this._socketList[socket.id] = {
      socket:socket,
      email:this._email,
      room: this._email,
      query: socket.handshake.query['email '],
      namespace: email
    };
  }

  getSocketList() {
    return this._socketList;
  }

  getSocketById(socketId) {
    return this._socketList[socketId];
  }

  createNamespace(email_user)  {
    if(!this.namespaceExist(email_user)) {
      var ns = {
                  id : email_user
                };
      this.setNamespaceQueue(ns);
      console.log('namespace creado ', this._namespaceQueue );
    }else {
    console.log('el namespace ya existe');
    }
  }

}


module.exports = SocketBuffer;
