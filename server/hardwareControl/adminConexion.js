SocketConection = require('./socketConexion');

class AdminConection extends SocketConection {
  constructor(io) {
    super(io);
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
