class SocketBuffer  {
  constructor() {
    this._users = [];
    this._namespaceQueue = [];
    this._roomsUsers = {};
    this._email = null;
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

  setRoomUser(roomName, client) {
    this._roomsUsers[client.id] = roomName
  }
  getRoomsUser() {
    return this._roomsUsers;
  }

  getRoomsByEmail(email) {
    let tempArray = {};
    Object.keys(this._roomsUsers).filter(function(key) {
      if(this._roomsUsers[key] == email) {
        tempArray[key] = email;
      }
    });
    return tempArray;
  }

  checkNamespace(namespace_name) {
      for (var i = 0; i < this._namespaceQueue.length; i++) {
        if (myArray[i].id === namespace_name) {
            return true;
        }
      }
    return false;
  }

  createNamespace(namespace_name) {
    var ns = {
      id : namespace_name
    };
    this.namespaceQueue.push(ns);
  }

  deleteNamespace(namespace){
    let index = this.namespaceQueue.indexOf(namespace);
    if(index > -1) {
      namespaceQueue.splice(index,1);
    }
  }



}
module.exports = SocketBuffer;
