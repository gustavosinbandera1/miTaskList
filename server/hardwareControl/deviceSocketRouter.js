var Device = require('../models/deviceModel');
var ctrl = require('../hardwareControl/deviceSocketController');
var db = require('../sqlSerices/sqlQuery');
HardwareControl = (io) => {//we need pass username in order to create namespace
  let io_ = io;
  //all client actually connected
  var clientConnected = [];
  var devicesConnected = [];
  var actualDevice;
  //all rooms available, all device online
  var rooms =  [];
  var namespace_queue = [];


  io_.use((socket, next ) => {
    let email = socket.handshake.query['email '];
     if( checkAuthToken(email) == false){
      let err = new Error('Authentication error');
      err.data = {type: 'authentication_error'};
      next(err);
     }
     console.log('authentication OK......',email);
     next();
  });

  //io.on('connect', function(socket) {});

  let users = io.of('/gustavosinbandera1-@');
  users.on('connect', (user) => {
    console.log('nueva conexion en el nuevo namespace');

    user.on('disconnect', () => {
      console.log('ususario del namespace nuevo desconectado');

    })
  });

  /*
  io_.of('').on('connect', function(client){
    console.log('socket connected in this moment', client.id);
    //vamos a crear el namespace
    //verificamos que sea un cliente y no un device por su email en el query
    if(client.handshake.query['email ']) {
      console.log('el email: ', client.handshake.query['email '])  ;
      let nspName = client.handshake.query['email '] + '@hotmail.com';
      console.log(' el namespace ', nspName);
      //verificamos que no exista el namespace
      searchObjectOnArray(nspName, namespace_queue);
       if(searchObjectOnArray(nspName, namespace_queue) ==  false) {
        createNamespace(nspName);
      }
      //si existe o se creo



      let dynamicNamespace = io.of('/' + nspName);
          dynamicNamespace.on('userConnection', (email) => {
            clientConnected.push(email);
            let query = `select * from devices where email_user="${email}@hotmail.com" `;
            db.sendQuery(query, (err, devices) => {
              if(err) {
                client.emit('connectionAccepted', {});
              }else {
                client.emit('connectionAccepted', devices);
              }
            });
          });
    }*/
        /*client.on('userConnection', (email) => {
      console.log('UserConnection receive:  ', email);
      clientConnected.push(email);
      //debemos traer la lista de dispositivos registrados
      let query = `select * from devices where email_user="${email}" `;
      db.sendQuery(query, (err, devices) => {
        if(err) {
          client.emit('connectionAccepted', {});
        }else {
          client.emit('connectionAccepted', devices);
        }
      });
      //para asi empezar a unirnos a cada una de las room a la que pertenece cada dispositivo
      //que se conforma por la mac y el email del owner
      //client.to(username).emit('onlineUsers', clientConnected);
    });*/

    /*escuchamos la conexion de un dispositivo, buscamos si esta registrado
    si es falso devemos desconectar el dispositivo del socket server
    de lo contrario debemos unir dicho dispositivo a su room correspondiente
    almacenamos el dispositivo en el array de dispositivos conectados
    y lo emitimos a su dueno en la room correspondiente a su email */
    /*client.on('deviceConnection', (data) => {
      //debemos traer el dispositivo de la base de datos para verificar que ya esta registrado
      //asi podemos crear la room a la cual el dispositivo se va a unir
      //consiste en la mac + el email del propietario
      var query = `select * from devices where mac_device = "${data.mac_device}"`;
      db.sendQuery(query, function(err, device) {
        if(err) {
          client.emit('error el dispositivo no esta registrado en el sistema');
        }else {
          this.actualDevice = device;//registro de la base dde datos
          let room = data.mac_device + device.email_user;//creamos la room
          let roomClient = device.email_user;//la roomclient es la room del dueno de los dispositivos
          client.room = room//agregamos la room al objeto client
          client.join(room);//nos unimos a la room
          //almacenamos los dispositivos conectados con su respectivo dueno
          devicesConnected[data.mac_device] = device.email_user;
          //con esto controlamos en el esp8266 un ciclo de verificacion esperando
          //que llegue esta aceptacion del servidor y mostrar dicho estado en un led o algo asi
          client.emit('connectionAccepted', data.mac_device);//emitimos al dispositivo
          //emitimos al dueno de los dispositivos conectados y el que se acaba de conectar
          client.to(roomClient).emit('newConexionDevice', actualDevice);
          client.to(roomClient).emit('onlineDevices', devicesConnected);
        }
      });

    });*/


   /* client.on('disconnect', () => {
      let username = client.handshake.query.userName ;
      let mac = client.handshake.query.mac;
      let userIndex;
      let deviceIndex;
    */
    /*   if(!username) {
        deviceIndex = deviceConnected.indexOf(client.handshake.query.mac);
        if(deviceIndex != -1) {
          deviceConnected.splice(deviceIndex, 1);
          io_.emit('updateDeviceList', deviceConnected);
        }
      } */

     /*  if(!mac) {
        usrIndex = clientConnected.indexOf(client.handshake.query.username);
        if(userIndex != -1) {
          clientConnected.splice(userIndex, 1);
          io_.emit('updateClientList', clientConnected);
        }
      } */
   // })

  //});



  checkAuthToken = function(token_) {
  console.log(token_);
    if(token_ == undefined) {
      console.log('entramos a token');
      return false
    }
    console.log('entramos');

    return true;
  }

  // Retorna un elemento que se desea buscar en un array
  searchObjectOnArray = function(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].id === nameKey) {
            return myArray[i];
        }
    }
    return false;
  }

  createNamespace = function(email_user) {
    var ns = {
                id : email_user
            };
    namespace_queue.push(ns);
    console.log('namespace creado');
    return ns;
  }


}
module.exports = HardwareControl;
