var db = require('../sqlSerices/sqlQuery');
var ctrl = {};

 var roomsUser =  {}; //rooms de usuarios conectados, cualquier room en cualquier namespace
 var namespaceQueue = [] ; //all namespace availables to not repeat only unique identifier
 var users= []; //list of all users connected
 //var devices = []; //list of all device connected array with index-mac and value email owner
 //var actualDevice; ///store the acual device connected
 var email = null;//store the actual email user



  createRoomDevice = (objData, client) => {

  }
//podemos repetir nombre de room que equivale al mismo usuario pero desde
//diferente cliente, asi que se tienen diferentes id que son propietarios tambien del dispositivo o dispositivos
  createRoomUser = (email,client) => {
    client.join(email);
    roomsUser[client.id] = email;
    console.log(' los rooms: ', roomsUser);
    var foundKeys = Object.keys(roomsUser).filter(function(key) {
      console.log('la respuesta', key);
    });
  }

  deleteRoomUser = (client) => {
    delete roomsUser[client.id];
  }

   // Retorna un elemento que se desea buscar en un array
   searchObjectOnArray = (nameKey, myArray) =>{
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].id === nameKey) {
            return myArray[i];
        }
      }
     return false;
   }

  createNamespaceAndQueue = (email_user) => {
    var ns = {
                id : email_user
            };
    namespaceQueue.push(ns);
    console.log('namespace creado ', namespaceQueue );
  }

  ctrl.getNamespaceQueue = () => {
    return namespaceQueue;
  }

  ctrl.searchNamespaceItem = (namespace) => {
    this.searchObjectOnArray(namespace, namespaceQueue);
  }

  ctrl.deleteNamespace = (namespace) => {
    let index = namespaceQueue.indexOf(namespace);
    if(index > -1) {
      namespaceQueue.splice(index,1);
    }
  }



  ctrl.checkAuthToken = (token_) => {
    console.log(token_);
      if(token_ == undefined) {
        console.log('entramos a token');
        return false
      }
      console.log('entramos al socket regustrados');
      return true;
  }


  ctrl.createNamespaceIfNotExist = (namespace_name) => {

      let temp = namespace_name;
      var nspName= temp.replace(/\s/g, '');
      console.log('el namespace', nspName);
      //verificamos que no exista el namespace
       if(searchObjectOnArray(nspName, namespaceQueue) == false) {
        createNamespaceAndQueue(nspName);
      }else {
        console.log('el namespace ya existe');
      }
  }

  ctrl.getEmail = () => {
    return email;
  }

  ctrl.setEmail = (eml) => {
    if(eml) {
    email= eml.replace(/\s/g, '');
    }
  }

  ctrl.handleNamespaceConnection = (io, namespace) => {
    console.log('manejando la conexion namespace', namespace);

    let dynamicNamespaces = io.of('/' + namespace);

        dynamicNamespaces.on('connect', handleConnection);

  }

  handleConnection = (socket) => {
    //client = conexion;
    socket.on('userConnection', function(email){
      addUser(email);
      createRoomUser(email, socket);//roomsUser[client.id]=email

      let query = `select * from devices where email_user="${email}@hotmail.com" `;
      db.sendQuery(query, (err, devices) => {
        if(err) {
          socket.emit('connectionAccepted', {});
        }else {
          socket.emit('connectionAccepted', devices);
        }
      });
    });

    handleDisconnect(socket);
  }

  deleteUser = (user) => {
    let index = users.indexOf(user);
    if(index >-1) {
      users.splice(index,1);
    }
  }

  addUser = (user) => {
    users.push(user);
  }

  handleDisconnect = (client) => {
    client.on('disconnect', () => {
      console.log('usuario desconectado', email);
       deleteUser(email);
       deleteRoomUser(client);
      console.log('lista de usuarios ', users);
    });
  }



module.exports = ctrl;
