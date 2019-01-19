var Device = require('../models/deviceModel');
var ctrl = {};

  ctrl.createDevice = (dataDevice, client ) => {
    var device = new Device(dataDevice);
      device.save(function(err){
        if(err) {
          client.emit('registerDevice', false);
          return false;
        }
        else {
          client.emit('registerDevice', true);
          return true;
        }
    });
  }

  ctrl.createRoomDevice = (objData, client) => {
    let room = objData.mac + client.handshake.query.userName;
    client.room = room
    client.join(room);
  }

  ctrl.createRoomUser = (client) => {
    let room = client.handshake.query.userName;
    client.room = room
    client.join(room);
  }

module.exports = ctrl;
