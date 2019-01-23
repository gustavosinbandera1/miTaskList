import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;
  constructor() {
  }
  connect(path: string, email: string) {
    if (!path) {
       path = 'http://192.168.1.54:8080';
    }
    return this.socket = io.connect( `${path}/${email}`, {query: `email = ${email}`});
  }

  on(eventName: any, callback: any) {
    if (this.socket) {
      this.socket.on(eventName, (data): any => {
        callback (data);
      });
    }
  }

  emit(eventName: any, data: any) {
    if (this.socket) {
      console.log('emitiendo evento ', data);

      this.socket.emit(eventName, data);
    }
  }

  removeListener(eventName: any) {
    if (this.socket) {
      this.socket.removeListener(eventName);
    }
  }
}
