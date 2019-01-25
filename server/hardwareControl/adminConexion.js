SocketConection = require('./socketConexion');

class AdminConection extends SocketConection {
  constructor(io) {
    super(io);
    io.on('connect', function(socket){
      console.log('socket conectadpo');

    })
     this.checkGeneralConections((type, nspClient) => {//type true = users false = devices
      if(type) {//user connected
          this.listenEventsUserNamespace(nspClient);
      }else {//device connected
        this.handleDevicesConnection(nspClient);
      }
    }); 
  }


}

module.exports = AdminConection;
